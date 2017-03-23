package com.mac.care_point.master.items.item_unit;

import com.mac.care_point.master.items.item_unit.model.MItemUnits;
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
 * @author Kavish Manjitha
 */
@CrossOrigin
@RestController
@RequestMapping("/api/care-point/master/item-unit")
public class ItemUnitController {

    @Autowired
    private ItemUnitService itemUnitService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MItemUnits> getAllItemUnits() {
        return itemUnitService.getAllItemUnits();
    }

    @RequestMapping(value = "/save-unit", method = RequestMethod.POST)
    public MItemUnits saveItemUnits(@RequestBody MItemUnits unit) {
        return itemUnitService.saveItemUnits(unit);
    }

    @RequestMapping(value = "/delete-unit/{indexNo}", method = RequestMethod.DELETE)
    public Integer deletItemUnits(@PathVariable Integer indexNo) {
        itemUnitService.deleteItemUnits(indexNo);
        return indexNo;
    }

    @RequestMapping(value = "/find-item-unit/{indexNo}/{priceCategory}", method = RequestMethod.GET)
    public List<MItemUnits> findUtemUnitByItem(@PathVariable Integer indexNo,@PathVariable Integer priceCategory) {
        return itemUnitService.findUtemUnitByItem(indexNo,priceCategory);
    }
}
