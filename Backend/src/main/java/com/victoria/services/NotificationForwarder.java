package com.victoria.services;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPatch;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by BenjaminB.-M on 2017-07-18.
 */
public class NotificationForwarder implements Runnable{
    public void run(){
        JSONArray notifications = getNotificationsFromDB();

        for(int i = 0; i < notifications.size(); i++){
            JSONObject currentLine = (JSONObject)notifications.get(i);
            JSONObject o = getJSONObjectToSend(currentLine);

            if(sendNotification(o)){
                updateNotificationDB(currentLine);
            }
        }
    }

    private JSONObject getJSONObjectToSend(JSONObject currentLine){
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        DateFormat hourFormat = new SimpleDateFormat("HH:mm:ss");
        Date date = new Date();
        Date datePlusOneDay = new Date();
        datePlusOneDay.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));

        JSONObject o = new JSONObject();
        String titre = ((String) currentLine.get("titre")).trim();
        o.put("cip", currentLine.get("cip"));
        o.put("title", "Nouvelle note pour : " + titre);
        o.put("description", "Sent at " + hourFormat.format(date));
        o.put("url", "https://s6ie1704.gel.usherbrooke.ca/note/" + titre);
        o.put("idChannel", "1");
        o.put("idCategory", "8");
        o.put("dateEmitted", dateFormat.format(date));
        o.put("dateExpired", dateFormat.format(datePlusOneDay));

        return o;
    }

    private JSONArray getNotificationsFromDB(){

        try {
            URL url = new URL("http://localhost:9090/v_notifications?est_envoye=eq.f");
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
            os.write(input.getBytes("UTF-8"));
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
        try{
            CloseableHttpClient httpClient = HttpClients.createDefault();
            HttpPatch httpPatch = new HttpPatch(new URI("http://localhost:9090/notification?notification_id=eq." + o.get("notification_id")));

            JSONObject json = new JSONObject();
            json.put("est_envoye", "true");
            StringEntity entity = new StringEntity(json.toJSONString());
            httpPatch.setEntity(entity);
            httpPatch.setHeader("Accept", "application/json");
            httpPatch.setHeader("Content-type", "application/json");

            CloseableHttpResponse response = httpClient.execute(httpPatch);
            //TODO todo something with the response
        }
        catch(Exception e){
            e.printStackTrace();
        }

    }
}
