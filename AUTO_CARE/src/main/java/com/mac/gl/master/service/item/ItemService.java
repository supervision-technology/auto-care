/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.item;

import com.mac.gl.master.model.item.MItem;
import com.mac.gl.master.repository.item.ItemRepository;
import com.mac.gl.system.exception.DuplicateEntityException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Don
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<MItem> getAllItem() {
        return itemRepository.findAll();
    }

    public MItem saveItem(MItem item) {
        return itemRepository.save(item);
    }

    public void deleteItem(Integer indexNo) {
        itemRepository.delete(indexNo);
    }
}
