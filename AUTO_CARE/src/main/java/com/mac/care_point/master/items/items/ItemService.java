/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.items;

import com.mac.care_point.master.items.item_unit.ItemUnitRepository;
import com.mac.care_point.master.items.item_unit.model.MItemUnits;
import com.mac.care_point.master.items.items.model.MItem;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Kavish Manjitha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ItemService {
    
    @Autowired
    private ItemRepository itemRepository;
    
    @Autowired
    private ItemUnitRepository itemUnitRepository;
    
    public List<MItem> findAllItems() {
        return itemRepository.findAll();
    }
    
    public MItem saveItem(MItem item) {
        
        MItem saveItem = itemRepository.save(item);
        
        if ("STOCK".equals(saveItem.getType())) {

            //create item units
            List<MItemUnits> findItemList = itemUnitRepository.findByItemAndItemUnitType(saveItem.getIndexNo(), "MAIN");
            
            if (findItemList.isEmpty()) {
                
                MItemUnits itemUnits = new MItemUnits();
                itemUnits.setItem(saveItem.getIndexNo());
                itemUnits.setItemUnitType("MAIN");
                itemUnits.setName(item.getName());
                itemUnits.setQty(new BigDecimal("1"));
                itemUnits.setSalePriceNormal(item.getSalePriceNormal());
                itemUnits.setSalePriceRegister(item.getSalePriceRegister());
                itemUnits.setCostPrice(item.getCostPrice());
                itemUnitRepository.save(itemUnits);
                
            } else {
                
                MItemUnits itemUnits = findItemList.get(0);
                itemUnits.setName(item.getName());
                itemUnits.setSalePriceNormal(item.getSalePriceNormal());
                itemUnits.setSalePriceRegister(item.getSalePriceRegister());
                itemUnits.setCostPrice(item.getCostPrice());
                
                itemUnitRepository.save(itemUnits);
                
            }
            
        }
        return saveItem;
    }
    
    public void deleteItem(Integer indexNo) {
        try {
            List<MItemUnits> findItemList = itemUnitRepository.findByItemAndItemUnitType(indexNo, "MAIN");
            itemUnitRepository.delete(findItemList.get(0));
            itemRepository.delete(indexNo);
        } catch (Exception e) {
            throw new RuntimeException("cannot delete this item because there are details in other transaction");
        }
    }
    
    public List<MItem> findByCategoryAndPriceCategory(Integer category, Integer packageCategory) {
        return itemRepository.findByCategoryAndPriceCategory(category, packageCategory);
    }
    
    List<MItem> findItemsByTypeAndQty(String TYPE) {
        return itemRepository.findByType(TYPE);
    }
    
    List<MItem> getSupplierItem(String stock, String nonStock) {
        return itemRepository.findByTypeOrType(stock, nonStock);
    }
}
