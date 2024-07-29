package com.mobilerecharge.recharge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mobilerecharge.recharge.model.PlansMode;

public interface PlansRepository extends JpaRepository<PlansMode, Integer> {
    
}
