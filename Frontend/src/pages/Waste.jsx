import { useState, useEffect, useCallback } from "react";
import FontAwesome from "react-fontawesome";
import {
  defer,
  useLoaderData,
  useNavigation,
  Form,
  useActionData,
} from "react-router-dom";
import { isLoggedIn } from "../utils";
import banner from "../images/waste_banner.png";
import { getAvailableAppointments, setCollectionAppointment } from "../api";

export function loader() {
  return defer({ appointments: getAvailableAppointments() });
}

export async function action({ request }) {
  const formData = await request.formData();
  const type = formData.get("type");
  const weight = formData.get("weight");
  const weightMetric = formData.get("weightMetric");
  const location = formData.get("location");
  const photo = formData.get("photo");
  const appointment = formData.get("appointment");
  try {
    await setCollectionAppointment({
      type,
      weight: `${weight} ${weightMetric}`,
      location,
      photo,
      appointment,
    });
  } catch (err) {
    return err.message;
  }
}

function Waste() {
  const [selectedWasteType, setSelectedWasteType] = useState("");
  const [weight, setWeight] = useState("");
  const [weightMetric, setWeightMetric] = useState("kg");
  const [expectedMoney, setExpectedMoney] = useState(null);
  const [weightStatus, setWeightStatus] = useState("");

  const errorMessage = useActionData();
  const { appointments: availableAppointments } = useLoaderData();
  const navigation = useNavigation();

  const wasteTypes = ["Plastic", "Organic", "Metal", "Glass", "Paper"];
  const weightMetrics = ["kg", "lbs"];

  const weightCriteria = {
    Plastic: { min: 1, max: 20 },
    Organic: { min: 2, max: 15 },
    Metal: { min: 3, max: 25 },
    Glass: { min: 4, max: 30 },
    Paper: { min: 1, max: 10 },
  };

  const calculateExpectedMoney = useCallback(() => {
    if (weight && selectedWasteType) {
      const money = weight * 0.1; // example calculation logic
      setExpectedMoney(money);
    } else {
      setExpectedMoney(null);
    }
  }, [weight, selectedWasteType]);

  const determineWeightStatus = useCallback(() => {
    if (weight && selectedWasteType) {
      const criteria = weightCriteria[selectedWasteType];
      if (criteria) {
        const weightInKg = weightMetric === "kg" ? weight : weight * 0.453592; // convert lbs to kg
        const accepted = weightInKg >= criteria.min && weightInKg <= criteria.max;
        setWeightStatus(accepted ? "Accepted" : "Rejected");
      } else {
        setWeightStatus("Rejected"); // If no criteria, default to Rejected
      }
    } else {
      setWeightStatus(""); // Reset status if weight or type is missing
    }
  }, [weight, selectedWasteType, weightMetric]);

  useEffect(() => {
    calculateExpectedMoney();
    determineWeightStatus();
  }, [selectedWasteType, weight, weightMetric, calculateExpectedMoney, determineWeightStatus]);

  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission
    if (weightStatus === "Rejected") {
      alert("The weight you entered is not within the acceptable range. Please adjust the weight and try again.");
      return; // Prevent form submission
    }
  
    const reqObj = new Request(window.location.href);
    const pathname = new URL(reqObj.url).pathname;
    const response = isLoggedIn();
    if (!response) {
      window.location.href = `/login?message=You must log in first.&redirectTo=${pathname}`;
    } else {
      e.target.submit(); // Submit the form if logged in
    }
  }

  function handleWeightChange(e) {
    const value = e.target.value;
    if (value >= 0) {
      setWeight(value);
    }
  }
  return (
    <main className="flex flex-col items-center">
      <div className="w-[90%] mx-auto"><img className="w-full " src={banner} alt="Banner" /></div>
      {errorMessage && <h3 className="text-red-500">{errorMessage}</h3>}
      <Form
        method="post"
        replace
        encType="multipart/form-data"
        className="w-4/5 p-8  mx-auto text-center grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        onSubmit={handleSubmit}
      >
        <div className="bg-[#FFFFFF] shadow-xl p-8 rounded-lg text-left">
          <h6 className="text-[#5DA646] text-xs mb-5">1 of 6</h6>
          <h3 className="text-lg font-semibold mb-2 text-[#1D2D47] leading-loose">
            Waste Collection
          </h3>
          <p className="mb-5 font-normal text-sm text-[#1D2D47] leading-loose">
            What type of waste would you be interested in collecting?
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {wasteTypes.map((type) => (
              <button
                key={type}
                type="button"
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                  selectedWasteType === type
                    ? "bg-customGreen text-white"
                    : "bg-[#E0E0E0] text-black"
                }`}
                onClick={() => setSelectedWasteType(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <input type="hidden" name="type" value={selectedWasteType} />
        </div>

        <div className="bg-[#FFFFFF] shadow-xl p-8 rounded-lg text-left">
          <h6 className="text-[#5DA646] text-xs mb-5">2 of 6</h6>
          <h3 className="text-lg font-semibold mb-2 text-[#1D2D47] leading-loose">
            Set Weight
          </h3>
          <p className="mb-5 font-normal text-sm text-[#1D2D47] leading-loose">
            Choose weight of the waste you want to remove{" "}
          </p>
          <h6 className="text-[#4D4D4D] text-xs mb-2">Weight</h6>
          <div className="flex items-center">
            <input
              type="number"
              name="weight"
              value={weight}
              required
              onChange={handleWeightChange}
              className="w-full p-2 border rounded-l"
            />
            <select
              name="weightMetric"
              value={weightMetric}
              onChange={(e) => setWeightMetric(e.target.value)}
              className="bg-[#33333365] p-2 border rounded-r"
            >
              {weightMetrics.map((metric) => (
                <option key={metric} value={metric}>
                  {metric}
                </option>
              ))}
            </select>
          </div>

          <p className="text-xs mt-3 text-[#4D4D4D]">
            Current Weight(
            <span
              className={`mt-2 text-xs font-semibold ${
                weightStatus === "Accepted" ? "text-green-500" : "text-red-500"
              }`}
            >
              {weightStatus}
            </span>
            )
          </p>
        </div>

        <div className="bg-[#FFFFFF] shadow-xl p-8 rounded-lg text-left">
          <h6 className="text-[#5DA646] text-xs mb-5">3 of 6</h6>
          <h3 className="text-lg font-semibold mb-2 text-[#1D2D47] leading-loose">
            Waste Drop off
          </h3>
          <p className="mb-5 font-normal text-sm text-[#1D2D47] leading-loose">
            Here’s the part where you have to transport the waste to the
            dumpsite closest to you.
          </p>
          <h6 className="text-[#1D2D47] text-xs mb-2">Your Address</h6>
          <div className="flex items-center">
          <FontAwesome name="fa-solid fa-location-crosshairs" />
          <input
              required
              type="text"
              name="location"
              className="w-full p-2 border-b rounded-t border-[#979797] outline-none"
            />
          </div>
        </div>

        <div className="bg-[#FFFFFF] shadow-xl p-8 rounded-lg text-left">
          <h6 className="text-[#5DA646] text-xs mb-5">4 of 6</h6>
          <h3 className="text-lg font-semibold mb-2 text-[#1D2D47] leading-loose">
          Upload Image
          </h3>
          <input
            required
            type="file"
            name="photo"
            accept="image/*"
            className="w-full border-dashed text-xs p-8 border-[#1D2D47] rounded h-[50%] "
          />
        </div>

        <div className="bg-[#FFFFFF] shadow-xl p-8 rounded-lg text-left">
          <h6 className="text-[#5DA646] text-xs mb-5">5 of 6</h6>
          <h3 className="text-lg font-semibold mb-2 text-[#1D2D47] leading-loose">
          Choose appointment
          </h3>
          <p className="mb-5 font-normal text-sm text-[#1D2D47] leading-loose">
          Choose your appointment to get your service  
          </p>
          <select required name="appointment" className="w-full p-2 border rounded outline-none text-xs">
            <option value="" disabled selected>Available appointment</option>
            {availableAppointments.length > 0 ? (
              availableAppointments.map((appointment) => (
                <option required key={appointment.id} value={appointment.id}>
                  {appointment.day} at {appointment.time}
                </option>
              ))
            ) : (
              <option value="" disabled>No appointments available</option>
            )}
          </select>
        </div>

        <div className="bg-[#FFFFFF] shadow-xl p-8 rounded-lg text-left">
          <h6 className="text-[#5DA646] text-xs mb-5">6 of 6</h6>
          <h3 className="text-lg font-semibold mb-2 text-[#1D2D47] leading-loose">
          Get paid
          </h3>
          <p className="mb-5 font-normal text-sm text-[#1D2D47] leading-loose">
          After the waste has been weighed you’d get paid for your efforts!
          </p>
          <h6 className="text-[#4D4D4D] text-xs mb-2">Current Profit</h6>
          <p className="text-2xl text-[#4D4D4D] font-extrabold">
            {expectedMoney !== null ? `${expectedMoney.toFixed(2)} EGP` : ""}
          </p>
        </div>

        <div className="col-span-full flex justify-center">
          <button
            type="submit"
            disabled={navigation.state === "submitting"}
            className="bg-[#00B207] text-white text-sm font-bold px-8 py-2 rounded-full transition-colors duration-300 hover:bg-white hover:text-green-500 border border-green-500"
          >
            {navigation.state === "submitting"
              ? "Submitting your appointment..."
              : "Request appointment"}
          </button>
        </div>
      </Form>
    </main>
  );
}

export default Waste;
