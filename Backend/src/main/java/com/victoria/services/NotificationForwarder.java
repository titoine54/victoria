package com.victoria.services;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by BenjaminB.-M on 2017-07-18.
 */
public class NotificationForwarder implements Runnable{
    public void run(){
        //1 - PosRest request to DB, get lines from Notification table with est_envoye à FALSE
        //2 - Pour chaque ligne, envoye forme un objet json et l'envoye a : https://s6ie1718.gel.usherbrooke.ca/api/developpeur/post_notification

        //{ "cip": "gosa3202", "title": "Titre test", "description": "Desc Test", "url": "", "idChannel": 1, "idCategory": 8, "dateEmitted": "2017-07-18", "dateExpired": "2017-07-19" }

        JSONArray notifications = getNotificationsFromDB();

        for(int i = 0; i < notifications.size(); i++){
            JSONObject currentLine = (JSONObject)notifications.get(i);
            JSONObject o = getJSONObjectToSend(currentLine);
            if(true){//sendNotification(o)){
                //POST TO POSTRESTS;
                System.out.println("SENTT");
                updateNotificationDB(currentLine);
            }
        }
    }

    private JSONObject getJSONObjectToSend(JSONObject currentLine){
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        Date datePlusOneDay = new Date();
        datePlusOneDay.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));

        JSONObject o = new JSONObject();
        o.put("cip", "bolb2201");//currentLine.get("cip")); ////////////////////////
        o.put("title", "No. " + currentLine.get("notification_id") + " " + Double.toString(Math.random()));/////////////////////////////////
        o.put("description", "Nouvelle note pour : " + currentLine.get("titre"));
        o.put("url", "https://s6ie1704.gel.usherbrooke.ca/");
        o.put("idChannel", "1");
        o.put("idCategory", "8");
        o.put("dateEmitted", dateFormat.format(date));//"2017-07-19"
        o.put("dateExpired", dateFormat.format(datePlusOneDay));

        return o;
    }

    private JSONArray getNotificationsFromDB(){

        try {
            URL url = new URL("http://localhost:9090/v_notifications?cip=eq.laci2103&est_envoye=eq.f");////////////////////
            InputStream is = url.openStream();

            JSONParser jsonParser = new JSONParser();
            JSONArray notificationsResponse = (JSONArray)jsonParser.parse(new InputStreamReader(is, "UTF-8"));

            return notificationsResponse;
        }
        catch(Exception e){
            e.printStackTrace();
        }

        return new JSONArray();
    }

    //TODO Return error if error has errored
    private boolean sendNotification(JSONObject jso){
        try {
            URL url = new URL("http://s6ie1718.gel.usherbrooke.ca/api/developpeur/post_notification");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");

            String input = jso.toJSONString();

            OutputStream os = conn.getOutputStream();
            os.write(input.getBytes());
            os.flush();

            if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
                System.out.println("Failed : HTTP error code : " + conn.getResponseCode());
                conn.disconnect();
                return false;
            }

            conn.disconnect();
            return true;
        }
        catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private void updateNotificationDB(JSONObject o){
        try {
            URL url = new URL("http://localhost:9090/notification?notification_id=eq." + o.get("notification_id"));
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setRequestProperty("X-HTTP-Method-Override", "PATCH");
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");

            JSONObject jso = new JSONObject();
            jso.put("est_envoye", true);
            String input = jso.toJSONString();

            OutputStream os = conn.getOutputStream();
            os.write(input.getBytes());
            os.flush();

            if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
                System.out.println("Failed : HTTP error code : " + conn.getResponseCode());
                conn.disconnect();
                //return false;
            }

            conn.disconnect();
            //return true;
        }
        catch (Exception e) {
            e.printStackTrace();
            //return false;
        }

    }
}
