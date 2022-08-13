import React from "react";
import ReactDOM from "react-dom";
import { Cascader } from "antd";

import provinces from 'china-division/dist/provinces.json';
import cities from 'china-division/dist/cities.json';
import areas from 'china-division/dist/areas.json';

import hkmotw from 'china-division/dist/HK-MO-TW.json'

areas.forEach((area) => {
    const matchCity = cities.filter(city => city.code === area.cityCode)[0];
    if (matchCity) {
        matchCity.children = matchCity.children || [];
        matchCity.children.push({
            label: area.name,
            value: area.code,
        });
    }
});

cities.forEach((city) => {
    const matchProvince = provinces.filter(province => province.code === city.provinceCode)[0];
    if (matchProvince) {
        matchProvince.children = matchProvince.children || [];
        matchProvince.children.push({
            label: city.name,
            value: city.code,
            children: city.children,
        });
    }
});

const options = provinces.map(province => ({
    label: province.name,
    value: province.code,
    children: province.children,
}));

// 合并港澳台行政区
const _hkmotw = Object.entries(hkmotw).map(([provinceName, provinceItem]) => {
    return {
        label: provinceName,
        value: (Math.random() * 1e10).toFixed(),
        children: Object.entries(provinceItem).map(([cityName, cityItem]) => {
            return {
                label: cityName,
                value: (Math.random() * 1e10).toFixed(),
                children: cityItem.map(area => {
                    return {
                        label: area,
                        value: (Math.random() * 1e10).toFixed()
                    }
                })
            }
        })
    }
})

var options1 = options.concat(_hkmotw)

function Optionss() {


    return (

        <Cascader
            options={options1}
            showSearch
            placeholder="请选择地址"
        />

    )
}

export default Optionss;