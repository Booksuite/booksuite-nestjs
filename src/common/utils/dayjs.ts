import dayjs from 'dayjs'
import IsBetween from 'dayjs/plugin/isBetween'
import IsSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import IsSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import Utc from 'dayjs/plugin/utc'

dayjs.extend(IsBetween)
dayjs.extend(IsSameOrBefore)
dayjs.extend(IsSameOrAfter)
dayjs.extend(Utc)
