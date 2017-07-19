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
        o.put("cip", "bolb2201");
        o.put("title", "test title");
        o.put("description", "test desc");
        o.put("url", "");
        o.put("idChannel", "1");
        o.put("idCategory", "8");
        o.put("dateEmitted", "2017-07-19");
        o.put("dateExpired", "2017-07-20");

        try {
            URL url = new URL("https://s6ie1718.gel.usherbrooke.ca/api/developpeur/post_notification");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");

            String input = o.toJSONString();

            OutputStream os = conn.getOutputStream();
            os.write(input.getBytes());
            os.flush();

            conn.disconnect();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
