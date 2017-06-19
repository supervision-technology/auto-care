package com.mac.care_point.system.environment;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kavish Manjitha
 */
@RestController
@CrossOrigin
@RequestMapping("/api/v1/system/environment")
public class SYEnvironmentController {

    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");

    @RequestMapping(value = "/system-date", method = RequestMethod.GET)
    public Date systemDate() throws ParseException {
        return DATE_FORMAT.parse(DATE_FORMAT.format(new Date()));
    }

    @RequestMapping(value = "/ping", method = RequestMethod.GET)
    public PingRespond ping() {
        PingRespond pingRespond = new PingRespond();
        pingRespond.setDate(new Date());
        return pingRespond;
    }

}
