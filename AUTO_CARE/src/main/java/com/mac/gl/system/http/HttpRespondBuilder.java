/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.system.http;

import java.util.List;

/**
 *
 * @author Don
 */
public class HttpRespondBuilder {

    public static final int SUCCESS = 200;
    public static final int ERROR = 500;
    //
    private static final String SUCCESS_MESSAGE = "SUCCESS";

    public static final <T> HttpRespondModel<T> successRespond(T value) {
        HttpRespondModel<T> respondModel = new HttpRespondModel<>();
        respondModel.setStatus(SUCCESS);
        respondModel.setMessage(SUCCESS_MESSAGE);
        respondModel.setValue(value);

        return respondModel;
    }

    public static final <T> HttpRespondModel<T> successRespond(List<T> value) {
        HttpRespondModel<T> respondModel = new HttpRespondModel<>();
        respondModel.setStatus(SUCCESS);
        respondModel.setMessage(SUCCESS_MESSAGE);
        respondModel.setValues(value);

        return respondModel;
    }

    public static final <T> HttpRespondModel<T> errorRespond(String message) {
        HttpRespondModel<T> respondModel = new HttpRespondModel<>();
        respondModel.setStatus(ERROR);
        respondModel.setMessage(message);

        return respondModel;
    }

}
