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





    @GET
    @Path("/v2/notes")
    @Produces(MediaType.APPLICATION_JSON)
    public String getNotes_v2(@Context HttpServletRequest req) {
        return "{\n" +
                "  \"aps\": [\n" +
                "    {\n" +
                "        \"apCode\": \"GIF501\", \"titre\": \"Droit\", \"credit\": 2, \"description\": \"Devenir un maître juridique et dominer le monde\",\n" +
                "        \"competences\": []\n" +
                "    },\n" +
                "    {\n" +
                "        \"apCode\": \"GIF500\", \"titre\": \"Conception d'un système embarqué et réseauté\", \"credit\": 3, \"description\": null,\n" +
                "        \"competences\": [\n" +
                "            { \"competenceNumero\": 1, \"description\": \"Faire un réseau\" },\n" +
                "            { \"competenceNumero\": 2, \"description\": \"Embarquer sur un système\" }\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"apCode\": \"GIF510\", \"titre\": \"Systèmes à microprocesseurs\", \"credit\": 2, \"description\": \"Exploiter une carte comportant un microcontrôleur et des circuits d'entrée/sortie en utilisant la documentation technique des composants et des logiciels qui la constituent; développer et mettre au point un logiciel sur un système embarqué en utilisant des outils de développement croisés.\",\n" +
                "        \"competences\": [\n" +
                "            { \"competenceNumero\": 1, \"description\": \"Exploiter une carte comportant un microcontrôleur et des circuits d'entrée-sortie en utilisant la documentation technique des composants et des logiciels qui la constituent.\" },\n" +
                "            { \"competenceNumero\": 2, \"description\": \"Développer et mettre au point un logiciel sur un système embarqué en utilisant des outils de développement croisés.\" }\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"apCode\": \"GIF520\", \"titre\": \"Propriétés des matériaux\", \"credit\": 2, \"description\": null,\n" +
                "        \"competences\": [\n" +
                "            { \"competenceNumero\": 1, \"description\": \"Savoir si un matériel est mou\" },\n" +
                "            { \"competenceNumero\": 2, \"description\": \"Appliquer la règle du pouce\" },\n" +
                "            { \"competenceNumero\": 3, \"description\": \"Calculer des calculs de manière scientifique\" }\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"apCode\": \"GIF530\", \"titre\": \"Circuits d'entrées/sorties et d'interfaces\", \"credit\": 1, \"description\": null,\n" +
                "        \"competences\": [\n" +
                "            { \"competenceNumero\": 1, \"description\": \"Circuits d'entrées\" },\n" +
                "            { \"competenceNumero\": 2, \"description\": \"Circuits de sorties\" }\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"apCode\": \"GIF540\", \"titre\": \"Noyaux temps réel et programmation concurrente\", \"credit\": 1, \"description\": null,\n" +
                "        \"competences\": [\n" +
                "            { \"competenceNumero\": 1, \"description\": \"Faire de la propagande en temps réel dans un système donné\" }\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"apCode\": \"GIF550\", \"titre\": \"Systèmes embarqués réseautés\", \"credit\": 1, \"description\": null,\n" +
                "        \"competences\": []\n" +
                "    },\n" +
                "    {\n" +
                "        \"apCode\": \"GIF560\", \"titre\": \"Statistiques et fiabilité des systèmes\", \"credit\": 2, \"description\": null,\n" +
                "        \"competences\": [\n" +
                "            { \"competenceNumero\": 1, \"description\": \"Loi normal\" },\n" +
                "            { \"competenceNumero\": 2, \"description\": \"Rendre un système fiable\" }\n" +
                "        ]\n" +
                "    }\n" +
                "  ],\n" +
                "  \"evaluations\": [\n" +
                "    {\n" +
                "        \"evaluationId\": 123, \"nom\": \"Rapport APP1\", \"individuel\": true, \"estNouveau\": false,\n" +
                "        \"activites\": {\n" +
                "            \"GIF500\": [{ \"competenceNumero\": 1, \"note\": 35, \"ponderation\": 40 }],\n" +
                "            \"GIF510\": [{ \"competenceNumero\": 1, \"note\": 80, \"ponderation\": 100 }, { \"competenceNumero\": 2, \"note\": 56, \"ponderation\": 70 }]\n" +
                "        }\n" +
                "    },\n" +
                "    {\n" +
                "        \"evaluationId\": 456, \"nom\": \"Examen Sommatif APP1\", \"individuel\": true, \"estNouveau\": false,\n" +
                "        \"activites\": {\n" +
                "            \"GIF500\": [{ \"competenceNumero\": 1, \"note\": null, \"ponderation\": 20 }],\n" +
                "            \"GIF520\": [{ \"competenceNumero\": 1, \"note\": null, \"ponderation\": 40 }, { \"competenceNumero\": 2, \"note\": null, \"ponderation\": 50 }]\n" +
                "        }\n" +
                "    },\n" +
                "    {\n" +
                "        \"evaluationId\": 321, \"nom\": \"Rapport APP2\", \"individuel\": true, \"estNouveau\": true,\n" +
                "        \"activites\": {\n" +
                "            \"GIF520\": [{ \"competenceNumero\": 1, \"note\": 34, \"ponderation\": 40 }, { \"competenceNumero\": 2, \"note\": 47, \"ponderation\": 50 }],\n" +
                "            \"GIF540\": [{ \"competenceNumero\": 1, \"note\": 64, \"ponderation\": 70 }]\n" +
                "        }\n" +
                "    },\n" +
                "    {\n" +
                "        \"evaluationId\": 654, \"nom\": \"Oral - Projet\", \"individuel\": false, \"estNouveau\": true,\n" +
                "        \"activites\": {\n" +
                "            \"GIF560\": [{ \"competenceNumero\": 1, \"note\": 22, \"ponderation\": 40 }, { \"competenceNumero\": 2, \"note\": 63, \"ponderation\": 70 }]\n" +
                "        }\n" +
                "    }\n" +
                "]\n" +
                "}";
    }

    @GET
    @Path("/v2/statistiques")
    @Produces(MediaType.APPLICATION_JSON)
    public String getStatistics_v2(@Context HttpServletRequest req) {
        return "{\n" +
                "  \"statistiques\": [\n" +
                "        { \"evaluationId\": 123, \"apCode\": \"GIF500\", \"competenceNumero\": 1, \"moyenne\": 30, \"ecartType\": 8 },\n" +
                "        { \"evaluationId\": 123, \"apCode\": \"GIF510\", \"competenceNumero\": 1, \"moyenne\": 59, \"ecartType\": 9 },\n" +
                "        { \"evaluationId\": 123, \"apCode\": \"GIF510\", \"competenceNumero\": 2, \"moyenne\": 47, \"ecartType\": 4 },\n" +
                "        { \"evaluationId\": 456, \"apCode\": \"GIF520\", \"competenceNumero\": 1, \"moyenne\": 27, \"ecartType\": 2 },\n" +
                "        { \"evaluationId\": 456, \"apCode\": \"GIF520\", \"competenceNumero\": 2, \"moyenne\": 36, \"ecartType\": 2 },\n" +
                "        { \"evaluationId\": 321, \"apCode\": \"GIF520\", \"competenceNumero\": 1, \"moyenne\": 30, \"ecartType\": 8 },\n" +
                "        { \"evaluationId\": 321, \"apCode\": \"GIF520\", \"competenceNumero\": 2, \"moyenne\": 29, \"ecartType\": 9 },\n" +
                "        { \"evaluationId\": 321, \"apCode\": \"GIF540\", \"competenceNumero\": 1, \"moyenne\": 47, \"ecartType\": 4 },\n" +
                "        { \"evaluationId\": 654, \"apCode\": \"GIF560\", \"competenceNumero\": 1, \"moyenne\": 37, \"ecartType\": 1 },\n" +
                "        { \"evaluationId\": 654, \"apCode\": \"GIF560\", \"competenceNumero\": 2, \"moyenne\": 63, \"ecartType\": 3 }\n" +
                "  ]\n" +
                "}";
    }
}
