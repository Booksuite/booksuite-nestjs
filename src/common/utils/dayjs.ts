import dayjs from 'dayjs'
import IsBetween from 'dayjs/plugin/isBetween'
import Utc from 'dayjs/plugin/utc'

dayjs.extend(IsBetween)
dayjs.extend(Utc)
