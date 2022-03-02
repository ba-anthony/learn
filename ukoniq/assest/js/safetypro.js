$( document ).ready(function() { 
   var windowWidth = $(this).width(); 
   if(windowWidth <= 767){ 
      var ua = navigator.userAgent,
     event = (ua.match(/ipad/i)) ? "touchstart" : "click";
   if ($('.table').length > 0) {
     $('.table .header_tb').on(event, function() {
       $(this).toggleClass("active", "").nextUntil('.header_tb').css('display', function(i, v) {
         return this.style.display === 'table-row' ? 'none' : 'table-row';
       });
     });
   }
   }
});


(function (H) {

  var pendingRenders = [];

  // https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
  
  function isElementInViewport(el) {

      var rect = el.getBoundingClientRect();

      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (
              window.innerHeight ||
              document.documentElement.clientHeight
          ) &&
          rect.right <= (
              window.innerWidth ||
              document.documentElement.clientWidth
          )
      );
  }

  H.wrap(H.Series.prototype, 'render', function deferRender(proceed) {
      var series = this,
          renderTo = this.chart.container.parentNode;

      // It is appeared, render it
      if (isElementInViewport(renderTo) || !series.options.animation) {
          proceed.call(series);

      // It is not appeared, halt renering until appear
      } else  {
          pendingRenders.push({
              element: renderTo,
              appear: function () {
                  proceed.call(series);
              }
          });
      }
  });

  function recalculate() {
      pendingRenders.forEach(function (item) {
          if (isElementInViewport(item.element)) {
              item.appear();
              H.erase(pendingRenders, item);
          }
      });
  }

  if (window.addEventListener) {
      ['DOMContentLoaded', 'load', 'scroll', 'resize']
          .forEach(function (eventType) {
              addEventListener(eventType, recalculate, false);
          });
  }

}(Highcharts));

$(function () {

   $('#reloadBar').click(function () {
      var index = $("#container").data('highchartsChart');
      var chart = Highcharts.charts[index];
      chart.series[0].show();    
      chart.series[1].show();
      chart.series[2].show();
      chart.series[3].show();
      $('#legend a').removeClass('disabled_legend');
   });

   $("#a1").click(function () {
      var index = $("#container").data('highchartsChart');
      var chart = Highcharts.charts[index];
      chart.series[0].show();    
      chart.series[1].hide();
      chart.series[2].hide();
      chart.series[3].hide();
      $(this).addClass('leg-clicked').siblings().removeClass('leg-clicked');
      $('#legend a').addClass('disabled_legend');
      $(this).removeClass('disabled_legend');
      //$('.highcharts-legend-item:nth-child(1)').click();
      //$(this).toggleClass("leg-clicked");
  });
  $("#a2").click(function () {
      var index = $("#container").data('highchartsChart');
      var chart = Highcharts.charts[index];
      chart.series[1].show();    
      chart.series[0].hide();
      chart.series[2].hide();
      chart.series[3].hide();
      $(this).addClass('leg-clicked').siblings().removeClass('leg-clicked');
      $('#legend a').addClass('disabled_legend');
      $(this).removeClass('disabled_legend');
      //$('.highcharts-legend-item:nth-child(2)').click();
      //$(this).toggleClass("leg-clicked");
  });
  $("#a3").click(function () {
      var index = $("#container").data('highchartsChart');
      var chart = Highcharts.charts[index];
      chart.series[2].show();    
      chart.series[0].hide();
      chart.series[1].hide();
      chart.series[3].hide();
      $(this).addClass('leg-clicked').siblings().removeClass('leg-clicked');
      $('#legend a').addClass('disabled_legend');
      $(this).removeClass('disabled_legend');
      //$('.highcharts-legend-item:nth-child(3)').click();
      //$(this).toggleClass("leg-clicked");
  });
  $("#a4").click(function () {
      var index = $("#container").data('highchartsChart');
      var chart = Highcharts.charts[index];
      chart.series[3].show();    
      chart.series[0].hide();
      chart.series[1].hide();
      chart.series[2].hide();
      $(this).addClass('leg-clicked').siblings().removeClass('leg-clicked');
      $('#legend a').addClass('disabled_legend');
      $(this).removeClass('disabled_legend');
      //$('.highcharts-legend-item:nth-child(4)').click();
      //$(this).toggleClass("leg-clicked");
});
//Adverse chart
 Highcharts.chart('container', {
   
    chart: {
       height: 420,
       type: 'column',
       backgroundColor: '#f4f4f4',
       animation: false
       },
    title: {
       text: '<div style="font-family: Oswald, sans-serif; font-size:1.5rem">ADVERSE REACTIONS (ALL GRADES)</div>',
       style: {
           color: '#823695',
           fontWeight:'bold'
          
       }

    },credits: {
       enabled: false
    },
  navigation: {
    buttonOptions: {
       enabled: false
    }
 },
    //subtitle: {
      // text: ''
   // },
    xAxis: {
       min: 1,
       max: 18,
       tickInterval: 1,
       title: {
          text: '<br> <div style="font-family: Oswald, sans-serif; font-size:1.5rem"><br> <br>CYCLE NUMBER <br><br> <div style="color:#505257; font-family: Nunito Sans, sans-serif;font-weight:bold; font-size:1.5rem; margin:1rem ;">Incidence of diarrhea, nausea, fatigue, and neutropenia over 18 cycles</div>',
          style: {
           color: '#823695'                     
          }
       },
       categories: [
          
       ],
       crosshair: true
    },
  yAxis: {
    min: 0,
    max: 30,
    tickInterval: 5,

    title: {
       text: '<div style="font-family: Oswald, sans-serif; color:#823695;font-size:1.5rem;">INCIDENCE(%)</div>'
    }

 },
    
    tooltip: {
       headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
       pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
       footerFormat: '</table>',
       shared: true,
       useHTML: true
    },
    plotOptions: {
       column: {
          pointPadding: 0.1,
          borderWidth: 0
       },
       series: {
       /* pointWidth: 0,
        pointPadding : 0,
        groupPadding : 0 ,
        borderWidth : 0*/
     }
    },
    
   /*
    legend: {
      useHTML: true,
      labelFormat: '<span class="span-legend-item" style="color:#fff;font-family:Oswald; font-weight:600;">{name}</span>',
      symbolPadding: 0,
      symbolWidth: 0,
      symbolHeight: 0,
      squareSymbol: false,  
  },*/
    

    series: [{
    
       name: 'DIARRHEA',
       data: [0,27, 12, 10, 10, 9, 9, 8, 11, 8, 7, 4, 7, 3, 8, 2, 4, 2, 3]
      
      
       
    }, {
       name: 'NAUSEA',
       data: [0,27, 6, 2, 3, 3, 1, 1, 3, 3, 3, 3, 1, 2, 3, 4, 4, 0, 3]

    }, {
       name: 'FATIGUE',
       data: [0,21, 7, 6, 5, 4, 1, 2, 2, 2, 4, 0, 4, 0, 0, 4, 0, 0, 0]

    }, {
       name: 'NEUTROPENIA',
       data: [0,4, 4, 4, 4, 2, 3, 3, 2, 1, 0, 1, 1, 1, 0, 4, 0, 0, 0]

    }]
    
 });
});

    //Adverse chart Mobile
  Highcharts.chart('adverse-mobile', {
    
     chart: {
       width:700,
       height:300,
        type: 'column',
        backgroundColor: '#fff',
        animation: false
        },
     title: {
        text: '<div style="font-family: Oswald, sans-serif; font-size:0.8rem; ">ADVERSE REACTIONS (ALL GRADES)</div>',
        style: {
            color: '#823695',
            fontWeight:'bold'
           
        }

     },credits: {
        enabled: false
     },
   navigation: {
     buttonOptions: {
        enabled: false
     }
  },
     //subtitle: {
       // text: ''
    // },
     xAxis: {
        min: 1,
        title: {
           text: '<br><div style="font-family: Oswald, sans-serif; font-size:0.8rem">CYCLE NUMBER <br><br> <div style="color:#505257; font-family: Nunito Sans, sans-serif;font-weight:bold; font-size:0.7rem; margin:1rem ;">Incidence of diarrhea, nausea, fatigue, and neutropenia over 18 cycles</div>',
           style: {
            color: '#823695'                     
           }
        },
        categories: [
           
        ],
        crosshair: true
     },
   yAxis: {
     min: 0,
     max: 35,
     tickInterval: 5,
     endOnTick: false,
     showLastLabel: false,
     title: {
        text: '<div style="font-family: Oswald, sans-serif; color:#823695;">INCIDENCE(%)</div>'
     }

  },
  legend: {
      align: 'center',
      x: 0,
      verticalAlign: 'top',
      y: 15,
      floating: true,
      backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || '#fff',
      borderColor: '#fff',
      borderWidth: 1,
      shadow: false,
      width:'50%',
      x: 30,
      itemStyle: {
         fontSize: '8px',
         align:'center',
         
      },
  },
     tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
           '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
        enabled:false
     },
     plotOptions: {
        column: {
           pointPadding: 0.2,
           borderWidth: 0
        },
 
        series: {
         events: {
             legendItemClick: function(event) {
                     return false;

             }
         }
     }
        
     },
     

     series: [{
        name: 'DIARRHEA',
        data: [0,27, 12, 10, 10, 9, 9, 8, 11, 8, 7, 4, 7, 3, 8, 2, 4, 2, 3]
       
        
     }, {
        name: 'NAUSEA',
        data: [0,27, 6, 2, 3, 3, 1, 1, 3, 3, 3, 3, 1, 2, 3, 4, 4, 0, 3]

     }, {
        name: 'FATIGUE',
        data: [0,21, 7, 6, 5, 4, 1, 2, 2, 2, 4, 0, 4, 0, 0, 4, 0, 0, 0]

     }, {
        name: 'NEUTROPENIA',
        data: [0,4, 4, 4, 4, 2, 3, 3, 2, 1, 0, 1, 1, 1, 0, 4, 0, 0, 0]

     }]
     
  });


   
 
     //Adverse Chart Mobile
 Highcharts.chart('container_mobile', {
    chart: {
    backgroundColor: '#BDBEC00F',
       type: 'column',
        spacingTop: 25
    },
    title: {
       text: 'ADVERSE REACTIONS (ALL GRADES)',
        style: {
                      color: '#863399',
                      fontWeight: 'bold',
                      fontFamily: 'Oswald'
                }
    },credits: {
       enabled: false
    },
  navigation: {
    buttonOptions: {
       enabled: false
    }
 },
    //subtitle: {
       //text: 'Source: WorldClimate.com'
    //},
    xAxis: {
       min: 1,
       max:18,
       title: {
          text: 'CYCLE NUMBER'
       },
       categories: [
         
       ],
       crosshair: true
    },
    yAxis: {
       min: 0,
       max:30,
       title: {
          text: 'INCIDENCE(%)'
       }
    },
    
    tooltip: {
       headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
       pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
       footerFormat: '</table>',
       shared: true,
       useHTML: true,
       enabled: false
    },
    plotOptions: {
       column: {
          pointPadding: 0.2,
          borderWidth: 0
       }
    },
    series: [{
       name: 'DIARRHEA',
       data: [0,27, 12, 10, 10, 9, 9, 8, 11, 8, 7, 4, 7, 3, 8, 2, 4, 2, 3]

    }
  ]
 });


//second table for mobile  

Highcharts.chart('container2_mobile', {
    chart: {
    backgroundColor: '#FA880D1A',
       type: 'column',
       spacingTop: 25
    },
    title: {
       text: 'ADVERSE REACTIONS (ALL GRADES)',
       style: {
                       display: 'none'
                }
    },credits: {
       enabled: false
    },
  navigation: {
    buttonOptions: {
       enabled: false
    }
 },
    //subtitle: {
       //text: 'Source: WorldClimate.com'
    //},
    xAxis: {
       min: 1,
       max:18,
       title: {
          text: 'CYCLE NUMBER'
       },
       categories: [
         
       ],
       crosshair: true
    },
    yAxis: {
       min: 0,
       max:30,
       title: {
          text: 'INCIDENCE(%)'
       }
    },
    
    tooltip: {
       headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
       pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
       footerFormat: '</table>',
       shared: true,
       useHTML: true,
       enabled: false
    },
    plotOptions: {
       column: {
          pointPadding: 0.2,
          borderWidth: 0
       }
    },
    series: [
  {
       name: 'NAUSEA',
       data: [0,27, 6, 2, 3, 3, 1, 1, 3, 3, 3, 3, 1, 2, 3, 4, 4, 0, 3],
    color: "#FF9E18"

    }
  ]
 });
 Highcharts.chart('container3_mobile', {
    chart: {
    backgroundColor: '#E8DFED5A',
       type: 'column',
       spacingTop: 25
    },
    title: {
       text: 'ADVERSE REACTIONS (ALL GRADES)',
       style: {
                       display: 'none'
                }
    },credits: {
       enabled: false
    },
  navigation: {
    buttonOptions: {
       enabled: false
    }
 },
    //subtitle: {
       //text: 'Source: WorldClimate.com'
    //},
    xAxis: {
       min: 1,
       max:18,
       title: {
          text: 'CYCLE NUMBER'
       },
       categories: [
         
       ],
       crosshair: true
    },
    yAxis: {
       min: 0,
       max:30,
       title: {
          text: 'INCIDENCE(%)'
       }
    },
    
    tooltip: {
       headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
       pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
       footerFormat: '</table>',
       shared: true,
       useHTML: true,
       enabled: false
    },
    plotOptions: {
       column: {
          pointPadding: 0.2,
          borderWidth: 0
       }
    },
    series: [
  {
       name: 'FATIGUE',
       data: [0,21, 7, 6, 5, 4, 1, 2, 2, 2, 4, 0, 4, 0, 0, 4, 0, 0, 0],
    color: "#AB88BD"

    }
  ]
 });
// fourth table for mobile 
 Highcharts.chart('container4_mobile', {
    chart: {
    backgroundColor: '#8236951F',
       type: 'column',
       spacingTop: 25
    },
    title: {
        text: '',
        style: {
            display: 'none'
        }
    },
    credits: {
       enabled: false
    },navigation: {
    buttonOptions: {
       enabled: false
    }
 },
    //subtitle: {
       //text: 'Source: WorldClimate.com'
    //},
    xAxis: {
       min: 1,
       max:18,
       title: {
          text: 'CYCLE NUMBER'
       },
       categories: [
         
       ],
       crosshair: true
    },
    yAxis: {
       min: 0,
       max:30,
       title: {
          text: 'INCIDENCE(%)'
       }
    },
    
    tooltip: {
       headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
       pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
       footerFormat: '</table>',
       shared: true,
       useHTML: true,
       enabled:false
    },
    plotOptions: {
       column: {
          pointPadding: 0.2,
          borderWidth: 0
       }
    },
    series: [
  {
       name: 'NEUTROPENIA',
       data:   [0,4, 4, 4, 4, 2, 3, 3, 2, 1, 0, 1, 1, 1, 0, 4, 0, 0, 0],
     color: "#823695"

    }
  ]
 });
 
 