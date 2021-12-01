# ginkgo-project

A prototype of a DNA alignment tool that searches specified genomes. The dynamic site can be run by pulling this repository and using ```python manage.py runserver``` for the backend and ```npm run build``` and ```npm start``` for the frontend. The static site can be viewed at: https://joeytab.github.io/ginkgo-project/

This service is built using django and react, and the static website is hosted using github-pages. 

The backend uses BioPython to query Blast for performing the alignments given the set of genomes to search.
