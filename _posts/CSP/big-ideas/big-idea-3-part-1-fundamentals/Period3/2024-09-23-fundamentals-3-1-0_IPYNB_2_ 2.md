---
toc: False
comments: True
layout: post
title: 3.1 Variable Introduction
description: Introduction to Variables
permalink: /csp/big-idea/p3/3-1-0
categories: ['CSP Big Ideas']
author: Ahaan Vaidyanathan, Spencer Lyons, Vasanth Rajasekaran, Xavier Thompson
menu: nav/csp_units/csp_unit3_p3_fundamentals.html
---

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
 border-bottom: 2px solid #f1c40f;
 padding-bottom: 5px;
 margin-bottom: 15px;
 }

 /* Custom style for inline code */
 code {
 background-color: #34495e;
 color: #e74c3c;
 padding: 2px 5px;
 border-radius: 4px;
 }

 /* Custom style for preformatted code blocks */
 pre {
 background-color: #2b2b2b;
 color: #f1f1f1;
 padding: 10px;
 border-radius: 5px;
 border: 1px solid #f1c40f; /* Updated border color */
 overflow-x: auto;
 }

 /* Code block syntax highlighting */
 .hljs-keyword, .hljs-selector-tag, .hljs-subst {
 color: #f92672; /* Keywords */
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

 /* Highlight blockquotes in orange */
 blockquote {
 border-left: 4px solid #f39c12;
 padding-left: 10px;
 color: #ecf0f1;
 font-style: italic;
 background-color: #2d2d2d;
 padding: 10px;
 border-radius: 4px;
 }

 /* Styling for emphasized text */
 em {
 color: #f39c12; /* Orange color for emphasized text */
 font-style: italic;
 }

 /* Style for bold text */
 strong {
 color: #ecf0f1;
 font-weight: bold;
 }

 /* Menu styling */
 .menu {
 background-color: #f1c40f;
 color: white;
 padding: 10px;
 border-radius: 5px;
 text-align: center;
 }

 .menu a {
 color: #f1c40f; /* Yellow links in menu */
 text-decoration: none;
 padding: 0 10px;
 }

 .menu a:hover {
 color: #f39c12; /* Orange on hover */
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
 background-color: #5e5e34;
 }
 
 table, th, td {
 border: 1px solid #7f8c8d;
 padding: 8px;
 color: #ecf0f1;
 }

 th {
 background-color: #f1c40f;
 color: white;
 }

 /* Custom styling for links with better visibility */
 a {
 color: #1abc9c;
 text-decoration: none;
 }

 a:hover {
 text-decoration: underline;
 color: #16a085;
 }
</style>


## Introduction to Variables 

A variable is a placeholder or container used to store information in a program. It allows you to label data with a descriptive name so you can refer to it later in your code. Variables can hold different types of data, such as numbers, text, or more complex structures, and they can be changed or updated throughout the program. They help make code more readable and easier to manage. In this lesson, we will explore and learn about how and when to use variables in Javascript and Python.  