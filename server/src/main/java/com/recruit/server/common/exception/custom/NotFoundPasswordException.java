package com.recruit.server.common.exception.custom;

import com.recruit.server.common.exception.CustomException;
import com.recruit.server.common.exception.ErrorCode;

/**
 * Created by Minky on 2021-08-12
 */
public class NotFoundPasswordException extends CustomException {
    public NotFoundPasswordException() { super(ErrorCode.NOT_FOUND_PASSWORD); }
}
