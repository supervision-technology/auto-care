package com.mac.gl.master.controller.itemUnit;

import com.mac.gl.master.model.itemUnit.MItemUnit;
import com.mac.gl.master.service.itemUnit.ItemUnitService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


/**
 *
 * @author Nidura Prageeth
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/master/item-unit")
public class ItemUnitController {
    
    @Autowired
    private ItemUnitService itemUnitService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MItemUnit> getAllItemUnits() {
        return itemUnitService.getAllItemUnits();
    }

    @RequestMapping(value = "/save-unit", method = RequestMethod.POST)
    public MItemUnit saveItemUnits(@RequestBody MItemUnit unit) {
        return itemUnitService.saveItemUnits(unit);
    }

    @RequestMapping(value = "/delete-unit/{indexNo}", method = RequestMethod.DELETE)
    public Integer deletItemUnits(@PathVariable Integer indexNo) {
        itemUnitService.deleteItemUnits(indexNo);
        return indexNo;
    }
    
}
