package com.victoria.rest;

/**
 * Created by BenjaminB.-M and Ric Matte on 2017-06-27.
 */
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Iterator;

@Path("/")
public class ApiRoute {
    @GET
    @Path("notes")
    @Produces(MediaType.APPLICATION_JSON)
    public String getNotes(@Context HttpServletRequest req, @Context HttpServletResponse res) {

        try {
            URL url = new URL("http://localhost:9090/v_notes_etudiants?cip=eq." + req.getRemoteUser() + "&trimestre=eq.H17");
            InputStream is = url.openStream();

            JSONParser jsonParser = new JSONParser();
            JSONArray noteResponse = (JSONArray)jsonParser.parse(new InputStreamReader(is, "UTF-8"));

            if(noteResponse.size() == 0){
                return "null";
            }
            /*
             * 1. Check Evaluation - If not existing : Add (Id, nom ,activité + Add note in Activité), else nothing
             * 2. Check specific activité - If not existing : Add activité, else nothing
             * 3. Check Put note
             */

            JSONObject evaluations = new JSONObject();
            JSONObject aps = new JSONObject();

            for (int i = 0; i < noteResponse.size(); i++) {
                JSONObject currentLine = (JSONObject)noteResponse.get(i);

                addEvaluation(currentLine, evaluations);
                addAp(currentLine, aps);
            }

            ///////////////////////////////////////////////////////
            // TODO: to remove
            JSONArray evals = object2array(evaluations);
            for(int j = 0; j < evals.size(); j++){
                JSONObject activities = (JSONObject) ((JSONObject) evals.get(j)).get("activites");
                JSONArray output = new JSONArray();
                for(Iterator iterator = activities.keySet().iterator(); iterator.hasNext();) {
                    String key = (String) iterator.next();
                    JSONObject a = new JSONObject();
                    a.put(key, activities.get(key));
                    output.add(a);
                }
                ((JSONObject) evals.get(j)).remove("activites");
                ((JSONObject) evals.get(j)).put("activites", output);
            }
            ///////////////////////////////////////////////////////

            // Making the response
            JSONObject returnedJSON = new JSONObject();
            returnedJSON.put("aps", object2array(aps));
            returnedJSON.put("evaluations", evals);
            return returnedJSON.toJSONString();
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return "null";
    }


    private void addEvaluation(JSONObject currentLine, JSONObject evaluations) {
        //Evaluation check
        String evalID = currentLine.get("evaluation_id").toString();
        JSONObject evaluation = (JSONObject)evaluations.get(evalID);
        if (evaluation == null) {
            evaluation = new JSONObject();
            evaluation.put("id", evalID);
            evaluation.put("nom", currentLine.get("evaluation"));
            evaluation.put("activites", new JSONObject());
            evaluation.put("individuel", Integer.parseInt(currentLine.get("individuel").toString()) == 1);
            evaluations.put(evalID, evaluation);
        }
        //Activities check
        JSONObject activities = (JSONObject)evaluation.get("activites");
        String apCode = currentLine.get("ap").toString();
        JSONArray activity = (JSONArray)activities.get(apCode);
        if (activity == null) {
            activity = new JSONArray();
            activities.put(apCode, activity);
        }
        JSONObject competenceNote = new JSONObject();

        // TODO : clean up rounding
        competenceNote.put("competenceNumero", currentLine.get("competence"));
        competenceNote.put("note", (Double)(Math.round((Double) currentLine.get("note")*100)/100.0));
        competenceNote.put("ponderation", currentLine.get("ponderation"));
        competenceNote.put("moyenne", (Double)(Math.round((Double) currentLine.get("moyenne")*100)/100.0));
        competenceNote.put("ecartType", (Double)(Math.round((Double) currentLine.get("ecart_type")*100)/100.0));
        activity.add(competenceNote);
    }


    private void addAp(JSONObject currentLine, JSONObject aps) {
        //Evaluation check
        String apCode = currentLine.get("ap").toString();
        JSONObject ap = (JSONObject)aps.get(apCode);
        if (ap == null) {
            ap = new JSONObject();
            ap.put("apCode", apCode);
            ap.put("titre", currentLine.get("apNom"));
            ap.put("credit", currentLine.get("apCredit"));
            ap.put("description", currentLine.get("apDescription"));
            ap.put("competences", new JSONArray());
            aps.put(apCode, ap);
        }
        //Activities check
        JSONArray competences = (JSONArray)ap.get("competences");
        int compNumber = Integer.parseInt(currentLine.get("competence").toString());
        boolean compExists = false;
        for (int i = 0; i < competences.size(); i++){
            JSONObject competence = (JSONObject)competences.get(i);
            if(compNumber == Integer.parseInt(competence.get("competenceNumero").toString())){
                compExists = true;
            }
        }
        if(!compExists) {
            JSONObject competence = new JSONObject();
            competence.put("competenceNumero", compNumber);
            competence.put("description", "");
            competences.add(competence);
        }
    }


    @GET
    @Path("user")
    @Produces(MediaType.APPLICATION_JSON)
    public String getUsers(@Context HttpServletRequest req) {

        try{
            URL url =  new URL("http://localhost:9090/membre?cip=eq." + req.getRemoteUser());
            InputStream is = url.openStream();

            JSONParser jsonParser = new JSONParser();
            JSONArray userResponse = (JSONArray)jsonParser.parse(new InputStreamReader(is, "UTF-8"));

            if(userResponse.size() == 0){
                return "null";
            }

            JSONObject userLine = (JSONObject)userResponse.get(0);
            JSONObject returnedJSON = new JSONObject();
            returnedJSON.put("cip", userLine.get("cip"));
            returnedJSON.put("firstName", userLine.get("prenom"));
            returnedJSON.put("lastName", userLine.get("nom"));
            returnedJSON.put("email", userLine.get("courriel"));
            returnedJSON.put("settings", new JSONObject());//TODO ITERATION 3 : fill json object with user settings

            return returnedJSON.toJSONString();
        }
        catch (Exception e){
            e.printStackTrace();
        }

        return "null";
    }


    private Double roundToTwoDecimals(Double value){
        return Math.round(value*100)/100.0;
    }

    private JSONArray object2array(JSONObject jsonObject) {
        JSONArray output = new JSONArray();
        for(Iterator iterator = jsonObject.keySet().iterator(); iterator.hasNext();) {
            String key = (String) iterator.next();
            output.add(jsonObject.get(key));
        }
        return output;
    }




    
    @GET
    @Path("notes_v2")
    @Produces(MediaType.APPLICATION_JSON)
    public String getNotes_v2(@Context HttpServletRequest req, @Context HttpServletResponse res) {

        try {
            URL url = new URL("http://localhost:9090/v2_notes_etudiants?cip=eq." + req.getRemoteUser() + "&trimestre=eq.H17");
            InputStream is = url.openStream();

            JSONParser jsonParser = new JSONParser();
            JSONArray noteResponse = (JSONArray)jsonParser.parse(new InputStreamReader(is, "UTF-8"));

            if(noteResponse.size() == 0){
                return "null";
            }
            /*
             * 1. Check Evaluation - If not existing : Add (Id, nom ,activité + Add note in Activité), else nothing
             * 2. Check specific activité - If not existing : Add activité, else nothing
             * 3. Check Put note
             */

            JSONObject evaluations = new JSONObject();
            JSONObject aps = new JSONObject();

            for (int i = 0; i < noteResponse.size(); i++) {
                JSONObject currentLine = (JSONObject)noteResponse.get(i);

                addEvaluation_v2(currentLine, evaluations);
                addAp(currentLine, aps);
            }

            // Making the response
            JSONObject returnedJSON = new JSONObject();
            returnedJSON.put("aps", object2array(aps));
            returnedJSON.put("evaluations", evaluations);
            return returnedJSON.toJSONString();
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return "null";
    }


    private void addEvaluation_v2(JSONObject currentLine, JSONObject evaluations) {
        //Evaluation check
        String evalID = currentLine.get("evaluation_id").toString();
        JSONObject evaluation = (JSONObject)evaluations.get(evalID);
        if (evaluation == null) {
            evaluation = new JSONObject();
            evaluation.put("id", evalID);
            evaluation.put("nom", currentLine.get("evaluation"));
            evaluation.put("activites", new JSONObject());

            evaluations.put(evalID, evaluation);
        }
        //Activities check
        JSONObject activities = (JSONObject)evaluation.get("activites");
        String apCode = currentLine.get("ap").toString();
        JSONArray activity = (JSONArray)activities.get(apCode);
        if (activity == null) {
            activity = new JSONArray();
            activities.put(apCode, activity);
        }
        JSONObject competenceNote = new JSONObject();

        // TODO : clean up rounding
        competenceNote.put("competenceNumero", currentLine.get("competence"));
        competenceNote.put("note", (Double)(Math.round((Double) currentLine.get("note")*100)/100.0));
        competenceNote.put("ponderation", currentLine.get("ponderation"));
        activity.add(competenceNote);
    }


    @GET
    @Path("statistiques_v2")
    @Produces(MediaType.APPLICATION_JSON)
    public String getStatistics(@Context HttpServletRequest req){

        try{
            URL url =  new URL("http://localhost:9090/v_statistiques_etudiants?cip=eq." + req.getRemoteUser()+"&trimestre=eq.H17");
            InputStream is = url.openStream();

            JSONParser jsonParser = new JSONParser();
            JSONArray statisticsResponse = (JSONArray)jsonParser.parse(new InputStreamReader(is, "UTF-8"));

            if(statisticsResponse.size() == 0){
                return "null";
            }

            JSONObject returnedJSON = new JSONObject();
            JSONArray stats = new JSONArray();
            returnedJSON.put("statistiques", stats);

            for(int i = 0; i < statisticsResponse.size(); i++){
                JSONObject currentLine = (JSONObject)statisticsResponse.get(i);
                JSONObject tmp = new JSONObject();
                tmp.put("evaluationId", currentLine.get("evaluationId"));
                tmp.put("ap", currentLine.get("ap"));
                tmp.put("competenceNumero", currentLine.get("competence"));
                tmp.put("moyenne", (Double)(Math.round((Double) currentLine.get("moyenne")*100)/100.0));
                tmp.put("ecartType", (Double)(Math.round((Double) currentLine.get("ecart_type")*100)/100.0));
                stats.add(tmp);
            }

            return returnedJSON.toJSONString();
        }
        catch(Exception e){
            e.printStackTrace();
        }

        return "null";
    }
}
