import dayjsInstance from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import minMax from 'dayjs/plugin/minMax'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/vi'

dayjsInstance.locale('en')
dayjsInstance.extend(relativeTime)
dayjsInstance.extend(quarterOfYear)
dayjsInstance.extend(minMax)
dayjsInstance.extend(utc)
dayjsInstance.extend(timezone)

export default dayjsInstance
