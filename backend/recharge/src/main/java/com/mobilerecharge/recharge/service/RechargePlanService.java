package com.example.recharge.service;

import com.example.recharge.model.RechargePlan;
import com.example.recharge.repository.RechargePlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RechargePlanService {

    @Autowired
    private RechargePlanRepository repository;

    public List<RechargePlan> getAllPlans() {
        return repository.findAll();
    }

    public Optional<RechargePlan> getPlanById(Long id) {
        return repository.findById(id);
    }

    public RechargePlan savePlan(RechargePlan plan) {
        return repository.save(plan);
    }

    public void deletePlan(Long id) {
        repository.deleteById(id);
    }
}
