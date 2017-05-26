# VictoriaApp

This project running on maven, jersey, web app and rest.

## Getting started

Install [tomcat](https://tomcat.apache.org/download-90.cgi)

Install IntelliJ

## Set up in IntelliJ

1. When you open IntelliJ, click on : **Import Project**

2. go to Path `../Victoria/Backend/` and click **import**

3.
   1. **File** > **Project Structure**
   2. Under **Project Settings**, click on **Facets** > **+** > Add **Web** (Blue squarre with planet) > Choose module **Victoria**
   3. On the bottom, click on **Create Artifact**
   4. Click on the artifact and on the list on the right, double click on every options
   5. Apply
4. 
   1. Create a new configuration
   2. **+** > **Tomcat** > **Local**
   3. **Deployment** > **+** (You are suppose to see the artifact that you just created.)
   4. Apply
5. Have fun :) (Run the program)


## Set up the Run/Debug configuration to run in local

1. Click on **Run** > **Edit configuration**
2. Click on the previously created configuration > (on the tab on the right) **Startup/Connection**
3. On **Run and/or Debug** make sure that `Pass environment variables` is checked
4. **+** > Name : `CATALINA_OPTS` AND Value: `-DserviceURL=http://localhost:8080`

As image below
![capture](https://cloud.githubusercontent.com/assets/19333898/26511805/9dcda312-4231-11e7-9d36-02d7ea75952a.PNG)
