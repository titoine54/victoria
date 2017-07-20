package com.victoria.services;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * Created by BenjaminB.-M on 2017-07-18.
 */
public class NotificationService implements ServletContextListener {

    ScheduledExecutorService ses = Executors.newScheduledThreadPool(1);
    NotificationForwarder nf = new NotificationForwarder();

    public void contextInitialized(ServletContextEvent e){
        ses.scheduleAtFixedRate(nf, 0, 30, TimeUnit.SECONDS);
    }


    public void contextDestroyed(ServletContextEvent event) {
        ses.shutdown();
    }
}
