import { Check, X } from "lucide-react"

export default function WhyChooseSection() {
  type CellData =
    | { type: "check"; value: true }
    | { type: "cross"; value: false }
    | { type: "text"; value: string; color?: string }

  type ComparisonRow = {
    feature: string
    ourService: CellData
    splash247: CellData
    maritimeExecutive: CellData
  }

  const comparisonData: ComparisonRow[] = [
    {
      feature: "Low Bandwidth Optimized",
      ourService: { type: "check", value: true },
      splash247: { type: "cross", value: false },
      maritimeExecutive: { type: "cross", value: false },
    },
    {
      feature: "AI Content Curation",
      ourService: { type: "check", value: true },
      splash247: { type: "cross", value: false },
      maritimeExecutive: { type: "cross", value: false },
    },
    {
      feature: "Regional Personalization",
      ourService: { type: "check", value: true },
      splash247: { type: "text", value: "Partial", color: "text-orange-400" },
      maritimeExecutive: { type: "cross", value: false },
    },
    {
      feature: "Safety Poster Integration",
      ourService: { type: "check", value: true },
      splash247: { type: "cross", value: false },
      maritimeExecutive: { type: "cross", value: false },
    },
    {
      feature: "Email Delivery",
      ourService: { type: "text", value: "Daily", color: "text-green-400" },
      splash247: { type: "text", value: "Newsletter", color: "text-orange-400" },
      maritimeExecutive: { type: "text", value: "Weekly", color: "text-orange-400" },
    },
    {
      feature: "Pricing (Annual)",
      ourService: { type: "text", value: "$100", color: "text-green-400" },
      splash247: { type: "text", value: "Free/Premium", color: "text-gray-300" },
      maritimeExecutive: { type: "text", value: "Subscription", color: "text-gray-300" },
    },
  ]


  const renderCell = (cellData: CellData) => {
    if (cellData.type === "check") {
      return <Check className="h-5 w-5 text-green-400 mx-auto" />
    }
    if (cellData.type === "cross") {
      return <X className="h-5 w-5 text-red-400 mx-auto" />
    }
    if (cellData.type === "text") {
      return <span className={cellData.color || "text-gray-300"}>{cellData.value}</span>
    }
    return null
  }

  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Why Choose Our Maritime News?</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how we compare to traditional maritime news sources
          </p>
        </div>

        <div className="bg-slate-700/50 rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-slate-600/50">
            <div className="p-6 text-gray-300 font-semibold">Features</div>
            <div className="p-6 text-orange-400 font-semibold text-center bg-slate-600/80">Our Service</div>
            <div className="p-6 text-gray-300 font-semibold text-center">Splash247</div>
            <div className="p-6 text-gray-300 font-semibold text-center">Maritime Executive</div>
          </div>

          {/* Table Rows */}
          {comparisonData.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 border-t border-slate-600/50 ${
                index % 2 === 0 ? "bg-slate-700/30" : "bg-slate-700/50"
              }`}
            >
              <div className="p-6 text-gray-300 font-medium">{row.feature}</div>
              <div className="p-6 text-center bg-slate-600/30">{renderCell(row.ourService)}</div>
              <div className="p-6 text-center">{renderCell(row.splash247)}</div>
              <div className="p-6 text-center">{renderCell(row.maritimeExecutive)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
