/*
 *  EntityNotFoundException.java
 *  
 *  @author Channa Mohan
 *     hjchanna@gmail.com
 *  
 *  Created on Oct 21, 2016, 9:28:28 AM
 *  All rights reserved.
 *  Copyrights supervision technology (pvt.) ltd.
 *  
 */
package com.mac.care_point.system.exception;

import com.mac.care_point.system.exception.handler.SystemException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


/**
 *
 * @author Mohan
 */
@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class EntityNotFoundException extends SystemException {

    public EntityNotFoundException(String message) {
        super(message);
    }

}
