import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function PlansCard({ plans }) {
  const navigate = useNavigate();
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl px-4 mx-auto py-12">
      {plans.map((plan, index) => {
        const isPopular = plan.popular;
        const cardBorder = isPopular ? "border-red-500" : "border-gray-700";
        const hoverBorder = `hover:border-${plan.color}-500`;
        const iconColor = `text-${plan.color}-500`;

        return (
          <motion.article
            key={plan.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative bg-gray-900/50 rounded-2xl p-8 border-2 ${cardBorder} ${hoverBorder}
              flex flex-col shadow-lg transition-transform transform hover:scale-105`}
          >
            {isPopular && (
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide shadow-lg">
                Most Popular
              </div>
            )}

            {plan.name === "Luxury" && (
              <div className="absolute top-0 right-0 bg-yellow-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg uppercase tracking-wide shadow-lg">
                Best Value
              </div>
            )}

            <div className="flex-grow text-center mb-6">
              <plan.icon className={`w-12 h-12 mx-auto mb-4 ${iconColor}`} />
              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              <p className="text-4xl font-extrabold text-white my-2">
                ${plan.price}
                <span className="text-lg font-medium text-gray-400 ml-1">
                  /month
                </span>
              </p>
            </div>

            <ul className="space-y-4 mb-8 text-sm text-left">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate(`/checkout/${plan.name}`)}
              aria-label={plan.buttonText}
              className={`w-full py-3 font-bold text-white cursor-pointer rounded-lg transition-all duration-300 ${
                plan.name === "Luxury"
                  ? "bg-yellow-600 hover:bg-yellow-600/90 shadow-md shadow-yellow-900/30"
                  : isPopular
                  ? "bg-red-700 hover:bg-red-800 shadow-md shadow-red-900/30"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {plan.buttonText}
            </button>
          </motion.article>
        );
      })}
    </section>
  );
}
