
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'

const InsightCard = (title, value, icon) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className={`hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-gray-700 to-gray-900 border-gray-700`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  </motion.div>
)

export default InsightCard; 