package com.ticket4u.domain.repositoryInterface;

import com.ticket4u.domain.vo.User;

public interface IUserClient  {
    User GetUserByID(String id);
    boolean IsExists(String id);
}
