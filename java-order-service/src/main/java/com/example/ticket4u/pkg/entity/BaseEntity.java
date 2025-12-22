package com.example.ticket4u.pkg.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class BaseEntity {
    private String creatorId;
    private String modifierId;
    private String deletorId;
    private int createdAt;
    private int modifiedAt;
    private int deletedAt;
}
