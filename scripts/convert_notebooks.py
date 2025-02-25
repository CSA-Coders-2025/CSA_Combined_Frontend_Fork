import glob
from nbconvert import MarkdownExporter
from nbconvert.utils.exceptions import ConversionException
import os
import nbformat
import yaml
import sys
import subprocess
from hashlib import sha256
from scripts.progress_bar import ProgressBar


notebook_directory = "_notebooks"
destination_directory = "_posts"
mermaid_output_directory = "assets/mermaid"

def error_cleanup(notebook_file):
    destination_file = os.path.basename(notebook_file).replace(".ipynb", "_IPYNB_2_.md")
    destination_path = os.path.join(destination_directory, destination_file)
    
    if os.path.exists(destination_path):
        os.remove(destination_path)

def extract_front_matter(notebook_file, cell):
    front_matter = {}
    source = cell.get('source', '')
    
    if source.startswith('---'):
        try:
            front_matter = yaml.safe_load(source.split('---', 2)[1])
        except yaml.YAMLError as e:
            print(f"Error parsing YAML front matter: {e}")
            error_cleanup(notebook_file)
            sys.exit(1)
    return front_matter

def get_relative_output_path(notebook_file):
    relative_path = os.path.relpath(notebook_file, notebook_directory)
    
    markdown_filename = relative_path.replace(".ipynb", "_IPYNB_2_.md")
    
    return os.path.join(destination_directory, markdown_filename)
    

def ensure_directory_exists(path):
    os.makedirs(os.path.dirname(path), exist_ok=True)

# Function to convert the notebook to Markdown with front matter
def convert_notebook_to_markdown_with_front_matter(notebook_file):
    with open(notebook_file, 'r', encoding='utf-8') as file:
        notebook = nbformat.read(file, as_version=nbformat.NO_CONVERT)
        front_matter = extract_front_matter(notebook_file, notebook.cells[0])
        notebook.cells.pop(0)
        process_mermaid_cells(notebook)
        exporter = MarkdownExporter()
        markdown, _ = exporter.from_notebook_node(notebook)
        front_matter_content = "---\n" + "\n".join(f"{key}: {value}" for key, value in front_matter.items()) + "\n---\n\n"
        markdown_with_front_matter = front_matter_content + markdown
        destination_path = get_relative_output_path(notebook_file)
        ensure_directory_exists(destination_path)
        with open(destination_path, "w", encoding="utf-8") as file:
            file.write(markdown_with_front_matter)

# Function to convert the Jupyter Notebook files to Markdown
def convert_single_notebook(notebook_file):
    try:
        convert_notebook_to_markdown_with_front_matter(notebook_file)
    except ConversionException as e:
        print(f"Conversion error for {notebook_file}: {str(e)}")
        error_cleanup(notebook_file)
        sys.exit(1)

def convert_notebooks():
    notebook_files = glob.glob(f"{notebook_directory}/**/*.ipynb", recursive=True)

    # create progress bar
    convertBar = ProgressBar(
        userInfo="Notebook conversion progress:", total=(len(notebook_files))
    )
    
    for notebook_file in notebook_files:
        try:
            convert_single_notebook(notebook_file)
            convertBar.continue_progress()
        except ConversionException as e:
            print(f"Conversion error for {notebook_file}: {str(e)}")
            error_cleanup(notebook_file)
            sys.exit(1)
    
    convertBar.end_progress()

if __name__ == "__main__":
    convert_notebooks()
