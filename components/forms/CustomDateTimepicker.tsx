import {DatesProvider, DateTimePicker} from '@mantine/dates';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import {useLocale} from "@/contexts/LocaleContext";
import {useState} from "react";

type DateValue = Date | null;

interface CustomDateTimePickerProps {
	value: DateValue;
	isDisabled?: boolean;
	onChange: (date: DateValue) => void;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({ value, onChange, isDisabled }) => {
	const { locale } = useLocale();
	const [selectedDate, setSelectedDate] = useState<DateValue>(null);

	const handleChange = (date: DateValue) => {
		setSelectedDate(date); // Устанавливаем выбранную дату
		onChange(date); // Вызываем onChange из пропсов
	};
	return (
			<MantineProvider>
				<DatesProvider settings={{ locale: locale, firstDayOfWeek: 1, timezone: 'Europe/Kyiv' }}>
					<DateTimePicker onChange={handleChange} value={value} disabled={isDisabled} withSeconds valueFormat="DD.MM.YYYY HH:mm:ss" />
				</DatesProvider>
			</MantineProvider>
	);
};

export default CustomDateTimePicker;