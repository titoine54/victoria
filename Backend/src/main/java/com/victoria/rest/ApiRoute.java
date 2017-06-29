package com.victoria.rest;

/**
 * Created by BenjaminB.-M and Ric Matte on 2017-06-27.
 */
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import javax.servlet.http.HttpServletRequest;
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
    public String getNotes(@Context HttpServletRequest req) {

        try {
            URL url = new URL("http://127.0.0.1:9090/v_notes_etudiants?cip=eq." + req.getRemoteUser() + "&trimestre=eq.H17");
            InputStream is = url.openStream();

            JSONParser jsonParser = new JSONParser();
            JSONArray noteResponse = (JSONArray)jsonParser.parse(new InputStreamReader(is, "UTF-8"));
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
        //Handle Catch + Error return (418)
        return "";
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
        competenceNote.put("competenceNumero", currentLine.get("competence"));
        competenceNote.put("note", currentLine.get("note"));
        competenceNote.put("ponderation", currentLine.get("ponderation"));
        competenceNote.put("moyenne", currentLine.get("moyenne"));
        competenceNote.put("ecartType", currentLine.get("ecart_type"));
        activity.add(competenceNote);
    }

    private void addAp(JSONObject currentLine, JSONObject aps) {
        //Evaluation check
        String apCode = currentLine.get("ap").toString();
        JSONObject ap = (JSONObject)aps.get(apCode);
        if (ap == null) {
            ap = new JSONObject();
            ap.put("apCode", apCode);
            ap.put("titre", currentLine.get("ap_nom"));
            ap.put("credit", currentLine.get("ap_credit"));
            ap.put("description", currentLine.get("ap_description"));
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

    private JSONArray object2array(JSONObject jsonObject) {
        JSONArray output = new JSONArray();
        for(Iterator iterator = jsonObject.keySet().iterator(); iterator.hasNext();) {
            String key = (String) iterator.next();
            output.add(jsonObject.get(key));
        }
        return output;
    }

    @GET
    @Path("user")
    @Produces(MediaType.APPLICATION_JSON)
    public String getUsers(@Context HttpServletRequest req) {

        try{
            URL url =  new URL("http://127.0.0.1:9090/membre?cip=eq." + req.getRemoteUser());
            InputStream is = url.openStream();

            JSONParser jsonParser = new JSONParser();
            JSONArray resultArray = (JSONArray)jsonParser.parse(new InputStreamReader(is, "UTF-8"));

            if(resultArray.size() != 1){
                //HANDLE ERROR
            }

            JSONObject result = (JSONObject)resultArray.get(0);
            JSONObject response = new JSONObject();
            response.put("cip", result.get("cip"));
            response.put("firstName", result.get("prenom"));
            response.put("lastName", result.get("nom"));
            response.put("email", result.get("courriel"));
            response.put("settings", new JSONObject());//TODO ITERATION 3 : fill json object with user settings

            return response.toJSONString();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        //Handle Catch + Error return (418)
        return "";
    }
}
