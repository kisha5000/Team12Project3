const get_combined_importance2 = "/combined_features_importance";
const TOP_NUM = 10;

function chartJS3() {
  d3.json(get_combined_importance2).then(function (combined_importance) {
    // grab feature importance data
    let item = combined_importance;
    item = getDistinct(item);
    item = item.sort(function (a, b) {
      return b.Feature_Percentage - a.Feature_Percentage;
    });
    console.log(item);
    let importance = item.map((dating) => parseInt(dating.Feature_Percentage));
    let feature_name = item.map((dating) => dating.Feature);
    // chart JS coding
    const ctx = document.getElementById("myPolar").getContext("2d");
    const chart = new Chart(ctx, {
      type: "polarArea",
      // data: data,

      //     options: options
      // });

      // The data for our dataset
      data: {
        labels: feature_name.slice(0, TOP_NUM),
        datasets: [
          {
            label: "Attribute",
            backgroundColor: [
              "blue",
              "green",
              "yellow",
              "teal",
              "tomato",
              "purple",
              "orange",
              "black",
              "pink",
              "gray",
            ],
            borderColor: "rgb(259,99,132)",
            data: importance.slice(0, TOP_NUM),
          },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
      },

      // Configuration options go here
      options: {
        responsive: true,
        legend: {
          position: "right",
        },
      });
  });
}
chartJS3();

function getDistinct(arr) {
  let result = [];
  let resultArr = [];
  arr.forEach((x) => {
    if (result.indexOf(x.Feature) == -1) {
      result.push(x.Feature);
      resultArr.push(x);
    }
  });
  return resultArr;
}
