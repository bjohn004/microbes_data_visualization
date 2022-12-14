
Summary/Problem: This repo contains the contents for creating a dashboard displaying the results from a JSON dataset summarizing findings from a microbe study. The visualization dashboard presents a clear understanding of microbe results for hundreds of subjects from the experiment. Select the Subject ID number on the webpage as seen in the snapshot below to get a new bar chart, gauge chart, and scatter chart that were created using Javascript/plotly.

![image1](images/screenshot.png)

***
## Introduction
This repo includes a web page that utilizes data from a json to create a dashboard. The dashboard allows you to select one of many different patients from a microbe study. The dashboard displays the following: 
+ A horizontal bar plot showing the top 10 microbes found on the patient
+ A bubble chart showing the amount of certain microbes
+ The patient's metadata
+ A gauge demonstrating the frequency of belly button washing.
***
## Contents
1. index.html - Contains the html code that displays the dashboard
    1. The GitHub pages URL is here https://bjohn004.github.io/microbes_data_visualization/
1. Static folder
    1. JS Folder
        1. app.js - Contains the Javascript code for the functions that generate the dropdown menu and Plotly plots.
