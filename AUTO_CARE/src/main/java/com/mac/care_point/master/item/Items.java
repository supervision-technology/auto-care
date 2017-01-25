
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.item;

import com.mac.care_point.master.item.model.MItem;

/**
 *
 * @author Don
 */
public class Items {

    private MItem item;
    private Integer allSubItems;
    private Integer chekedItem;

    public Items() {
    }

    public Items(MItem item, Integer allSubItems, Integer chekedItem) {
        this.item = item;
        this.allSubItems = allSubItems;
        this.chekedItem = chekedItem;
    }

    public MItem getItem() {
        return item;
    }

    public void setItem(MItem item) {
        this.item = item;
    }

    public Integer getAllSubItems() {
        return allSubItems;
    }

    public void setAllSubItems(Integer allSubItems) {
        this.allSubItems = allSubItems;
    }

    public Integer getChekedItem() {
        return chekedItem;
    }

    public void setChekedItem(Integer chekedItem) {
        this.chekedItem = chekedItem;
    }

}
