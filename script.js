var DISCOUNTED_PRICE = 0;

function calculatePrice() {
  var durationOfVisit = document.getElementById("durationOfVisit").value;
  var frequencyOfVisit = document.getElementById("frequencyOfVisit");
  var durationOfContract = document.getElementById("durationOfContract").value;
  var actualPrice = 0;

  var freq = 1;
  var duration = 1;

  // Set actualPrice based on selected options
  if (durationOfVisit === "halfDay") {
    actualPrice = 699;
  } else if (durationOfVisit === "fullDay") {
    actualPrice = 999;
  }

  // Calculate the actual total price
  var actualTotalPrice = actualPrice;

  // Calculate the discounted total price
  var discount = 0;

  if (frequencyOfVisit.value === "onceAMonth") {
    freq = 1;
  } else if (frequencyOfVisit.value === "twiceAMonth") {
    freq = 2;
    discount += 2;
  } else if (frequencyOfVisit.value === "fourTimesAMonth") {
    freq = 4;
    discount += 5;
  }

  // Adjust discounted total price based on contract duration
  if (durationOfContract === "threeMonths") {
    duration = 3;
    discount += 10;
  } else if (durationOfContract === "sixMonths") {
    duration = 6;
    discount += 15;
  } else if (durationOfContract === "twelveMonths") {
    duration = 12;
    discount += 30;
  }

  // Reset the "Frequency of Visit" options if "Single visit" is selected as the duration of contract
  if (durationOfContract === "singleVisit") {
    frequencyOfVisit.value = "onceAMonth"; // Set the value to "onceAMonth"
    frequencyOfVisit.disabled = true; // Disable the "Frequency of Visit" options

    document.getElementById("actualTotalPrice").style.display = "none";
    document.getElementById("totalDiscount").style.display = "none";
    document.getElementById("realCostPerVisit").style.display = "none";

    freq = 1;
    duration = 1;
    discount = 0;
  } else {
    // Enable the "Frequency of Visit" options
    frequencyOfVisit.disabled = false;

    document.getElementById("actualTotalPrice").style.display = "inline";
    document.getElementById("totalDiscount").style.display = "inline";
    document.getElementById("realCostPerVisit").style.display = "inline";
  }

  actualTotalPrice = actualPrice * freq * duration;

  var discountedPrice = actualTotalPrice - actualTotalPrice * (discount / 100);
  DISCOUNTED_PRICE = Math.round(discountedPrice);
  var totalDiscount = actualTotalPrice - discountedPrice;

  var effectiveCostPerVisit = Math.round(discountedPrice / (freq * duration));

  document.getElementById("discountedTotalPrice").textContent =
    "₹ " + Math.round(discountedPrice);
  document.getElementById("actualTotalPrice").textContent =
    "₹ " + Math.round(actualTotalPrice);
  document.getElementById("totalDiscount").textContent =
    " (" + Math.round(discount) + "% saved)";

  document.getElementById("effectiveCostPerVisit").textContent =
    "₹ " + effectiveCostPerVisit;
  document.getElementById("realCostPerVisit").textContent = "₹ " + actualPrice;
}

// Automatically calculate and populate the total prices when the form is changed
var form = document.getElementById("packageCalculatorForm");
form.addEventListener("change", calculatePrice);

// Trigger the initial calculation on page load
calculatePrice();

// JavaScript code to handle the button click and display the popup

$(document).ready(function () {
  $("#hireGardenerBtn").click(function () {
    // Get selected values from the form
    const durationOfVisit = $("#durationOfVisit option:selected").text();
    const durationOfContract = $("#durationOfContract option:selected").text();
    const frequencyOfVisit = $("#frequencyOfVisit option:selected").text();

    // Display the selected values in the popup and style them as green
    $("#selectedDurationOfVisitText").html(
      "Duration of Visit: <strong>" + durationOfVisit + "</strong>"
    );
    $("#selectedDurationOfContractText").html(
      "Duration of Contract: <strong>" + durationOfContract + "</strong>"
    );
    $("#selectedFrequencyOfVisitText").html(
      "Frequency of Visit: <strong>" + frequencyOfVisit + "</strong>"
    );
    $("#discountedTotalPriceModal").html(
      "Total: <strong>" + DISCOUNTED_PRICE + "</strong>"
    );

    // Set hidden form values

    $("#selectedDurationOfVisitTextHid").val(durationOfVisit);
    $("#selectedDurationOfContractTextHid").val(durationOfContract);
    $("#selectedFrequencyOfVisitTextHid").val(frequencyOfVisit);
    $("#discountedTotalPriceModalHid").val(DISCOUNTED_PRICE);

    // Show the popup
    $("#confirmationModal").modal("show");
  });
});