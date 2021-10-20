package com.recruit.server.common.exception.custom;

import com.recruit.server.common.exception.CustomException;
import com.recruit.server.common.exception.ErrorCode;

/**
 * Created by Minky on 2021-08-11
 */
public class InvalidEmailOrPasswordException extends CustomException {
    public InvalidEmailOrPasswordException() { super(ErrorCode.INVALID_EMAIL_OR_PASSWORD); }
}
