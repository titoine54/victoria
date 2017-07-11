package com.victoria.rest;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 * Mock calls for testing the frontend
 */
@Path("/mock")
public class Mock {
    /**
     * Method handling HTTP GET requests. The returned object will be sent
     * to the client as "text/plain" media type.
     *
     * @return String that will be returned as a text/plain response.
     */
    @GET
    @Path("/user")
    @Produces(MediaType.APPLICATION_JSON)
    public String getUser(@Context HttpServletRequest req) {
        return "{\n" +
                "  \"cip\": \"grab1337\",\n" +
                "  \"firstName\": \"Bob\",\n" +
                "  \"lastName\": \"Gratton\",\n" +
                "  \"email\": \"bob.gratton@usherbrooke.ca\",\n" +
                "  \"settings\": {\n" +
                "    \"enableEmailNotif\": true,\n" +
                "    \"enableSmsNotif\": false,\n" +
                "    \"smsNumber\": \"999 999-9999\",\n" +
                "    \"notifEmail\": \"bob.gratton@usherbrooke.ca\"\n" +
                "  }\n" +
                "}";
    }

    @PUT
    @Path("/user")
    @Produces(MediaType.APPLICATION_JSON)
    public String postUser(@Context HttpServletRequest req) {
        return "{\"message\": \"ok\"}";
    }

    @GET
    @Path("/notes")
    @Produces(MediaType.APPLICATION_JSON)
    public String getNotes(@Context HttpServletRequest req) {
        return "{\n" +
                "  \"aps\": [\n" +
                "    {\n" +
                "      \"apCode\": \"GIF500\",\n" +
                "      \"titre\": \"Chasser\",\n" +
                "      \"credit\": 2,\n" +
                "      \"description\": \"Devenir un maître chasseur\",\n" +
                "      \"competences\": [\n" +
                "          {\"competenceNumero\": 1, \"description\": \"Bien viser\"},\n" +
                "          {\"competenceNumero\": 2, \"description\": \"Bien se cacher\"}\n" +
                "      ]\n" +
                "    },\n" +
                "    {\n" +
                "      \"apCode\": \"GIF510\",\n" +
                "      \"titre\": \"Cuisiner\",\n" +
                "      \"credit\": 3,\n" +
                "      \"description\": \"Devenir un maître cuisinier\",\n" +
                "      \"competences\": [\n" +
                "          {\"competenceNumero\": 1, \"description\": \"Bien préparer\"},\n" +
                "          {\"competenceNumero\": 2, \"description\": \"Bien cuire\"}\n" +
                "    ]\n" +
                "    }\n" +
                "  ],\n" +
                "  \"evaluations\": [\n" +
                "    {\n" +
                "      \"nom\": \"Rapport APP1\",\n" +
                "      \"individuel\": true,\n" +
                "      \"activites\": [\n" +
                "        {\n" +
                "          \"GIF500\": [\n" +
                "            {\n" +
                "              \"competenceNumero\": \"1\",\n" +
                "              \"note\": \"35\",\n" +
                "              \"ponderation\": \"40\",\n" +
                "              \"moyenne\": \"30\",\n" +
                "              \"ecartType\": \"8\"\n" +
                "            }\n" +
                "          ]\n" +
                "        },\n" +
                "        {\n" +
                "          \"GIF510\": [\n" +
                "            {\n" +
                "              \"competenceNumero\": \"1\",\n" +
                "              \"note\": \"64\",\n" +
                "              \"ponderation\": \"100\",\n" +
                "              \"moyenne\": \"56\",\n" +
                "              \"ecartType\": \"9\"\n" +
                "            },\n" +
                "            {\n" +
                "              \"competenceNumero\": \"2\",\n" +
                "              \"note\": \"56\",\n" +
                "              \"ponderation\": \"70\",\n" +
                "              \"moyenne\": \"47\",\n" +
                "              \"ecartType\": \"4\"\n" +
                "            }\n" +
                "          ]\n" +
                "        }\n" +
                "      ]\n" +
                "    }\n" +
                "  ]\n" +
                "}\n";
    }

    @GET
    @Path("/notify/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String notify(@Context HttpServletRequest req) {
        return "{\"message\": \"ok\"}";
    }
}
