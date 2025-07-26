import { motion } from "framer-motion";

type MetricCardProps = {
  icon: JSX.Element;
  reverse: boolean;
  metric: string;
  description: string;
};

//used in the about section
export function MetricCard({ icon, reverse, metric, description }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: reverse ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ borderColor: "#a4579f" }}
      transition={{ duration: 0.6 }}
      className="relative rounded-2xl bg-white dark:bg-[#191919] p-3 lg:p-4 overflow-hidden z-0 border border-transparent"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className={`absolute -bottom-1/2 right-0 bg-[#a4579f] size-16 lg:size-24 blur-[3rem] rounded-full -z-10 ${reverse ? "left-0 right-auto" : ""}`}
      />
      <div className={`flex items-center justify-between gap-4 z-30 ${reverse ? "flex-row-reverse" : ""}`}>
        <div className="flex flex-col pl-2">
          <span className="text-2xl font-medium text-foreground">{metric}</span>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className={`h-12 pr-2 w-12 rounded-xl flex items-center justify-center ${reverse ? "order-first" : ""}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
