---
toc: False
comments: True
layout: post
title: 3.7.3 Javascript Hacks
description: Javascript example of nested conditionals
permalink: /csp/big-idea/p3/3-7-3
author: Zoe, Rutvik, Avika, Jonah, Aarush
menu: nav/csp_units/csp_unit3_p3_fundamentals.html
---

Here's an example of a javascript hack that simulates fitness levels. As you can see, the code utilizes `if` and `else statements`. `If statements` and `else statements` are commonly used together. `If statements` check if a statement is true, while `else statements` will check if it is false.

<style>
  /* Global styling for the notebook with dark background */
  body {
      font-family: 'Arial', sans-serif;
      background-color: #2c3e50;
      color: #ecf0f1;
  }

  /* Styling headers with lighter text and borders */
  h1, h2, h3, h4, h5 {
      color: #ecf0f1;
      border-bottom: 2px solid #9b59b6; /* Amethyst purple */
      padding-bottom: 5px;
      margin-bottom: 15px;
  }

  /* Custom style for inline code */
  code {
      background-color: #34495e;
      color: #8e44ad; /* Deep purple */
      padding: 2px 5px;
      border-radius: 4px;
  }

  /* Custom style for preformatted code blocks */
  pre {
      background-color: #2b2b2b;
      color: #f1f1f1;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #9b59b6; /* Updated border color to amethyst */
      overflow-x: auto;
  }

  /* Code block syntax highlighting */
  .hljs-keyword, .hljs-selector-tag, .hljs-subst {
      color: #9b59b6; /* Keywords now purple */
  }

  .hljs-string, .hljs-attr, .hljs-symbol, .hljs-bullet, .hljs-addition {
      color: #a6e22e; /* Strings */
  }

  .hljs-title, .hljs-section, .hljs-attribute {
      color: #e6db74; /* Function titles and sections */
  }

  .hljs-variable, .hljs-template-variable {
      color: #fd971f; /* Variables */
  }

  .hljs-comment, .hljs-quote, .hljs-deletion {
      color: #75715e; /* Comments */
  }

  .hljs-number, .hljs-regexp, .hljs-literal, .hljs-type, .hljs-built_in, .hljs-builtin-name {
      color: #ae81ff; /* Numbers and built-ins */
  }

  .hljs-meta {
      color: #66d9ef; /* Meta information */
  }

  .hljs-emphasis {
      font-style: italic;
  }

  .hljs-strong {
      font-weight: bold;
  }

  /* Highlight blockquotes in purple */
  blockquote {
      border-left: 4px solid #8e44ad; /* Deep purple */
      padding-left: 10px;
      color: #ecf0f1;
      font-style: italic;
      background-color: #2d2d2d;
      padding: 10px;
      border-radius: 4px;
  }

  /* Styling for emphasized text */
  em {
      color: #8e44ad; /* Purple for emphasized text */
      font-style: italic;
  }

  /* Style for bold text */
  strong {
      color: #ecf0f1;
      font-weight: bold;
  }

  /* Menu styling */
  .menu {
      background-color: #9b59b6; /* Amethyst purple */
      color: white;
      padding: 10px;
      border-radius: 5px;
      text-align: center;
  }

  .menu a {
      color: #f39c12; /* Orange links in menu */
      text-decoration: none;
      padding: 0 10px;
  }

  .menu a:hover {
      color: #8e44ad; /* Purple on hover */
  }

  /* Adjust the styling for markdown lists */
  ul {
      list-style-type: square;
      color: #ecf0f1;
  }

  /* Styling tables with dark theme */
  table {
      border-collapse: collapse;
      width: 100%;
      background-color: #48345e;
  }
  
  table, th, td {
      border: 1px solid #7f8c8d;
      padding: 8px;
      color: #ecf0f1;
  }

  th {
      background-color: #9b59b6; /* Purple for table headers */
      color: white;
  }

  /* Custom styling for links with better visibility */
  a {
      color: #9b59b6; /* Purple links */
      text-decoration: none;
  }

  a:hover {
      text-decoration: underline;
      color: #8e44ad; /* Dark purple on hover */
  }
</style>



```javascript
%%javascript
function assessFitnessLevel(pushUps) {
    let fitnessLevel;
    if (pushUps >= 50) {
        fitnessLevel = "Elite";
    } else {
        if (pushUps >= 30) {
            fitnessLevel = "Advanced";
        } else {
            if (pushUps >= 15) {
                fitnessLevel = "Intermediate";
            } else {
                if (pushUps >= 1) {
                    fitnessLevel = "Beginner";
                } else {
                    fitnessLevel = "Unfit";
                }
            }
        }
    }
    return fitnessLevel;
}
// Example usage
const userPushUps = 28; // Change this value to test different inputs
console.log(`Fitness Level: ${assessFitnessLevel(userPushUps)}`);
```


    <IPython.core.display.Javascript object>


## Javascript Hack
- In this hack, the `if statement` works with the `else statement` to determine the user's fitness level. The `if statement` checks if the user has gotten more than the given number of pushups,  if it doesn't work,  the `else statement` will be executed. The `else statement` will check if the user has gotten less than the number of pushups, if it doesn't meet the requirements, the user will be classified as the lower level.

## Here's a short overview of nested conditionals:


```python
if outer_condition:
    # Code for when outer_condition is true
    if inner_condition:
        # Code for when both outer_condition and inner_condition are true
    else:
        # Code for when outer_condition is true but inner_condition is false
else:
    # Code for when outer_condition is false
```


      File "/tmp/ipykernel_741876/1518511658.py", line 5
        else:
        ^
    IndentationError: expected an indented block after 'if' statement on line 3



- Notice that there are `if` and `else statements` inside of the system which makes it so that those statements depend on the outer function to be true. This is what makes them nested conditionals
