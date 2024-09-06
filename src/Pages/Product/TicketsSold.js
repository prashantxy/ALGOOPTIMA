import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';



const  TicketsSold =  (props) => {

  const ticketDataRef=collection(db,"ticketData")

  useLayoutEffect(() => {
    // Create root element
    let root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft: 0,
      paddingRight: 1
    }));

    // Add cursor
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // Create axes
    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true
    });

    xRenderer.labels.template.setAll({
      rotation: 0,
      centerY: am5.p100,
      centerX: am5.p50,
      paddingRight: 15
    });

    xRenderer.grid.template.setAll({
      location: 1
    });

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: "Route",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));


    let yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1
    });

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: yRenderer
    }));

    // Create series
    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "ticketsSold",
      sequencedInterpolation: true,
      categoryXField: "Route",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0
    });

    series.columns.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", function (stroke, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });


    let data=[]

    const getTicketData= async() => {
      let filtered = await getDocs(ticketDataRef);
      filtered = filtered.docs;
      filtered=filtered.filter( (doc) => 
      {
        return (doc.data().date >= props.ticketDate1 && doc.data().date <= props.ticketDate2  );
      })
      filtered=filtered.map( (doc) => ({
        Route: doc.data().destA+"\n  to  \n"+doc.data().destB,
        ticketsSold: parseInt(doc.data().noOfTickets)
      }))
      data=filtered;

      const dataMap= new Map();

      for(let i of data)
      {
          const currentRoute = i.Route ;
          if(dataMap.has(currentRoute))
          {
            dataMap.set(currentRoute, dataMap.get(currentRoute) + i.ticketsSold);
          }
          else
          {
            dataMap.set(currentRoute,i.ticketsSold);
          }
      }

      data=[]
      for (let [route, tickets] of dataMap )
      {
        data.push( {
          Route : route,
          ticketsSold : tickets 
        })
      }

      xAxis.data.setAll(data);
      series.data.setAll(data);
      // Make stuff animate on load
      series.appear(1000);
      chart.appear(1000, 100);
  
    }
    
    getTicketData();

    return () => {
      root.dispose();
    };
    

  });

  return (
    <div id="chartdiv" style={{ width: "70%", height: "700px", margin: "auto" }}>
        <h1>Tickets Sold On Each Route</h1>
    </div>
  );
};

export default TicketsSold;
