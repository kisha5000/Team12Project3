const get_male_importance = "/male_features_importance";
const get_female_importance = "/female_features_importance";

function chartJS2() {
  d3.json(get_male_importance).then(function (male_importance) {
    d3.json(get_female_importance).then((female_importance) => {
      // grab feature importance data
      let item = male_importance;
      let itemFemale = female_importance;

      //console.log(female_importance);
      item = window.getDistinct(item);
      itemFemale = window.getDistinct(item);
      item = getCertainFeatures(item, [
        "fun_of_partner",
        "partner_says_yes",
        "shar_of_partner",
      ]);
      itemFemale = getCertainFeatures(item, [
        "fun_of_partner",
        "partner_says_yes",
        "shar_of_partner",
      ]);
      //console.log(item);

      item = item.sort(sortByPercent);
      itemFemale = itemFemale.sort(sortByPercent);

      let importance = item.map((dating) => dating.Feature_Percentage);
      let feature_name = item.map((dating) => dating.Feature);

      let importance_fe = item.map((dating) => dating.Feature_Percentage);
      let feature_name_fe = item.map((dating) => dating.Feature);

      var chartData = {
        labels: ["fun_of_partner", "partner_says_yes", "shar_of_partner"],
        datasets: [
          {
            label: "Male",
            backgroundColor: "blue",
            borderColor: "yellow",
            borderWidth: 1,
            data: importance,
          },
          {
            label: "Female",
            backgroundColor: "pink",
            borderColor: "red",
            borderWidth: 1,
            data: importance_fe,
          },
        ],
      };
      // chart JS coding
      const ctx = document.getElementById("myChart2").getContext("2d");
      const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "bar",

        // The data for our dataset
        data: chartData,

        // Configuration options go here
        options: {
          responsive: true,
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Male vs. Female Attributes",
          },
        },
      });
    });
  });
}
chartJS2();

function sortByPercent(a, b) {
  return b.Feature_Percentage - a.Feature_Percentage;
}
function getCertainFeatures(arr, featuresWanted) {
  let result = [];
  featuresWanted.forEach((fw) => {
    arr.filter((x) => x.Feature == fw).forEach((x) => result.push(x));
  });
  return result;
}

/*
var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var color = Chart.helpers.color;
		var barChartData = {

		};

		window.onload = function() {
			var ctx = document.getElementById('canvas').getContext('2d');
			window.myBar = new Chart(ctx, {
				type: 'bar',
				data: barChartData,
				options: {
					responsive: true,
					legend: {
						position: 'top',
					},
					title: {
						display: true,
						text: 'Chart.js Bar Chart'
					}
				}
			});

		};

*/
