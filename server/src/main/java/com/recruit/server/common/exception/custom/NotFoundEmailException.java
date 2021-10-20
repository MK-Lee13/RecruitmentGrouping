package com.recruit.server.common.exception.custom;

import com.recruit.server.common.exception.CustomException;
import com.recruit.server.common.exception.ErrorCode;

/**
 * Created by Minky on 2021-08-11
 */
public class NotFoundEmailException extends CustomException {
    public NotFoundEmailException() { super(ErrorCode.NOT_FOUND_EMAIL); }
}
