package com.victoria.rest;

/**
 * Created by BenjaminB.-M on 2017-06-27.
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

@Path("/")
public class ApiRoute {
    @GET
    @Path("notes")
    @Produces(MediaType.APPLICATION_JSON)
    public String getNotes(@Context HttpServletRequest req) {

        try{
            URL url =  new URL("http://10.43.158.107:9090/note_random?cip=eq." + req.getRemoteUser());
            InputStream is = url.openStream();

            JSONParser jsonParser = new JSONParser();

            // Array of JSONObjects - Got to format it for the frontend
            JSONArray result = (JSONArray)jsonParser.parse(new InputStreamReader(is, "UTF-8"));
            return result.get(0).toString();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        //Handle Catch + Error return (418)
        return "";
    }
}
