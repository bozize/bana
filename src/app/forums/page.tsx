// app/visa-info/page.tsx (App Router) or pages/visa-info.tsx (Pages Router)
import React from 'react';

const VisaInfoPage = () => {
  return (
    <div className="min-h-screen bg-white py-10 px-4 flex justify-center">
      <div className="w-full max-w-5xl bg-white  rounded-2xl p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-black mb-10">
          Kenya & Tanzania Visa Guide (2025)
        </h1>

        {/* Kenya Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-green-600 mb-4">🇰🇪 Kenya: Electronic Travel Authorization (eTA)</h2>
          <p className="mb-4 text-gray-700">
            Kenya introduced eTA in 2025. Most travelers must apply for eTA online before arrival. Visa-free entry applies but eTA is mandatory.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">How to Apply</h3>
          <ol className="list-decimal ml-6 space-y-2 text-gray-700">
            <li>
              Visit: <a href="https://etakenya.go.ke/" target="_blank" className="text-blue-600 underline">https://etakenya.go.ke</a>
            </li>
            <li>Create an account using your email.</li>
            <li>Fill in personal, passport, and travel details.</li>
            <li>Upload:
              <ul className="list-disc ml-5 mt-1">
                <li>Passport bio page</li>
                <li>Passport photo</li>
              </ul>
            </li>
            <li>Pay $32.50 via card.</li>
            <li>Submit and wait ~72 hours for approval.</li>
            <li>Download and print your eTA from email.</li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Exemptions</h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Kenyan passport/permit holders</li>
            <li>Residents & East African Community (EAC) citizens</li>
            <li>Transit passengers not leaving airport</li>
          </ul>
        </section>

        {/* Tanzania Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-yellow-600 mb-4">🇹🇿 Tanzania: Electronic Visa (e-Visa)</h2>
          <p className="mb-4 text-gray-700">
            Tanzania suspended Visa on Arrival in January 2025. All travelers must apply online for an e-Visa before arriving.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">How to Apply</h3>
          <ol className="list-decimal ml-6 space-y-2 text-gray-700">
            <li>
              Visit: <a href="https://visa.immigration.go.tz/" target="_blank" className="text-blue-600 underline">https://visa.immigration.go.tz</a>
            </li>
            <li>Select visa type (e.g., Tourist).</li>
            <li>Fill in the form with personal/passport/travel info.</li>
            <li>Upload:
              <ul className="list-disc ml-5 mt-1">
                <li>Passport bio page</li>
                <li>Photo</li>
                <li>Optional: return ticket, accommodation</li>
              </ul>
            </li>
            <li>Pay the visa fee online.</li>
            <li>Submit and wait 7–10 business days for approval.</li>
            <li>Download and print visa approval from email.</li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Zanzibar Requirement</h3>
          <p className="text-gray-700">
            Visitors to Zanzibar must have valid travel insurance.
          </p>
        </section>

        {/* General Travel Tips */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">🌍 Travel Tips for Both Countries</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Apply for eTA/e-Visa at least 2 weeks before travel.</li>
            <li>Passport must be valid 6+ months beyond your trip.</li>
            <li>Carry physical and digital copies of all travel docs.</li>
            <li>Have proof of accommodation and return/onward flight.</li>
            <li>Yellow Fever vaccination may be required (esp. if from endemic countries).</li>
            <li>Only use official government portals listed above.</li>
          </ul>
        </section>

        <p className="mt-10 text-sm text-gray-500 text-center">
          Sources: <a href="https://etakenya.go.ke" className="underline text-blue-600" target="_blank">Kenya eTA Portal</a>, <a href="https://visa.immigration.go.tz" className="underline text-blue-600" target="_blank">Tanzania eVisa Portal</a>, 
        </p>
      </div>
    </div>
  );
};

export default VisaInfoPage;
