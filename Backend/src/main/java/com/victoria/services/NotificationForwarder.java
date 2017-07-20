package com.victoria.services;

import org.json.simple.JSONObject;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by BenjaminB.-M on 2017-07-18.
 */
public class NotificationForwarder implements Runnable{
    public void run(){
        //1 - PosRest request to DB, get lines from Notification table with est_envoye à FALSE
        //2 - Pour chaque ligne, envoye forme un objet json et l'envoye a : https://s6ie1718.gel.usherbrooke.ca/api/developpeur/post_notification

        //{ "cip": "gosa3202", "title": "Titre test", "description": "Desc Test", "url": "", "idChannel": 1, "idCategory": 8, "dateEmitted": "2017-07-18", "dateExpired": "2017-07-19" }
        JSONObject o = new JSONObject();
        o.put("cip", "marf3402");
        o.put("title", "test title"+Double.toString(Math.random()));
        o.put("description", "test desc4");
        o.put("url", "www.google.com");
        o.put("idChannel", "1");
        o.put("idCategory", "8");
        o.put("dateEmitted", "2017-07-19");
        o.put("dateExpired", "2017-07-20");

        try {
            URL url = new URL("http://s6ie1718.gel.usherbrooke.ca/api/developpeur/post_notification");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");

            String input = o.toJSONString();

            OutputStream os = conn.getOutputStream();
            os.write(input.getBytes());
            os.flush();

            if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
                System.out.println("Failed : HTTP error code : " + conn.getResponseCode());
            }

            conn.disconnect();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
