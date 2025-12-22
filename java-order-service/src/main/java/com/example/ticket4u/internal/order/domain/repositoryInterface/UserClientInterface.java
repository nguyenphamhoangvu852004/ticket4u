package com.example.ticket4u.internal.order.domain.repositoryInterface;

import com.example.ticket4u.internal.order.domain.vo.User;

public interface UserClientInterface  {
    User GetUserByID(String id);
    boolean IsExists(String id);
}
