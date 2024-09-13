import { clearSpecialChars } from './clearSpecialChars'

export type IsPhoneOptions = {
  iso: string
  ddi: string
  number: string
}

export const countriesPhone = [
  {
    name: 'Afghanistan',
    code: '+93',
    iso: 'AF',
    flag: '🇦🇫',
    mask: '00-000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Albania',
    code: '+355',
    iso: 'AL',
    flag: '🇦🇱',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Algeria',
    code: '+213',
    iso: 'DZ',
    flag: '🇩🇿',
    mask: '00-000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'American Samoa',
    code: '+1',
    iso: 'AS',
    flag: '🇦🇸',
    mask: '(684) 000-0000',
    regex: /^684[0-9]{7}$/
  },
  {
    name: 'Andorra',
    code: '+376',
    iso: 'AD',
    flag: '🇦🇩',
    mask: '000-000',
    regex: /^[0-9]{6}$/
  },
  {
    name: 'Angola',
    code: '+244',
    iso: 'AO',
    flag: '🇦🇴',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Anguilla',
    code: '+1',
    iso: 'AI',
    flag: '🇦🇮',
    mask: '(264) 000-0000',
    regex: /^264[0-9]{7}$/
  },
  {
    name: 'Antigua and Barbuda',
    code: '+1',
    iso: 'AG',
    flag: '🇦🇬',
    mask: '(268) 000-0000',
    regex: /^268[0-9]{7}$/
  },
  {
    name: 'Argentina',
    code: '+54',
    iso: 'AR',
    flag: '🇦🇷',
    mask: '(000) 000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Armenia',
    code: '+374',
    iso: 'AM',
    flag: '🇦🇲',
    mask: '00-000-000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Aruba',
    code: '+297',
    iso: 'AW',
    flag: '🇦🇼',
    mask: '000-0000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Australia',
    code: '+61',
    iso: 'AU',
    flag: '🇦🇺',
    mask: '0-0000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Austria',
    code: '+43',
    iso: 'AT',
    flag: '🇦🇹',
    mask: '(000) 000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Azerbaijan',
    code: '+994',
    iso: 'AZ',
    flag: '🇦🇿',
    mask: '00-000-00-00',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Bahamas',
    code: '+1',
    iso: 'BS',
    flag: '🇧🇸',
    mask: '(242) 000-0000',
    regex: /^242[0-9]{7}$/
  },
  {
    name: 'Bahrain',
    code: '+973',
    iso: 'BH',
    flag: '🇧🇭',
    mask: '0000-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Bangladesh',
    code: '+880',
    iso: 'BD',
    flag: '🇧🇩',
    mask: '1000-000000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Barbados',
    code: '+1',
    iso: 'BB',
    flag: '🇧🇧',
    mask: '(246) 000-0000',
    regex: /^246[0-9]{7}$/
  },
  {
    name: 'Belarus',
    code: '+375',
    iso: 'BY',
    flag: '🇧🇾',
    mask: '(00) 000-00-00',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Belgium',
    code: '+32',
    iso: 'BE',
    flag: '🇧🇪',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Belize',
    code: '+501',
    iso: 'BZ',
    flag: '🇧🇿',
    mask: '000-0000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Benin',
    code: '+229',
    iso: 'BJ',
    flag: '🇧🇯',
    mask: '00-00-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Bermuda',
    code: '+1',
    iso: 'BM',
    flag: '🇧🇲',
    mask: '(441) 000-0000',
    regex: /^441[0-9]{7}$/
  },
  {
    name: 'Bhutan',
    code: '+975',
    iso: 'BT',
    flag: '🇧🇹',
    mask: ['17-000-000', '77-000-000', '0-000-000'],
    regex: [/^17[0-9]{6}$/, /^77[0-9]{6}$/, /^[0-9]{7}$/]
  },
  {
    name: 'Bolivia',
    code: '+591',
    iso: 'BO',
    flag: '🇧🇴',
    mask: '0-000-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Bosnia and Herzegovina',
    code: '+387',
    iso: 'BA',
    flag: '🇧🇦',
    mask: ['00-0000', '00-00000'],
    regex: [/^[0-9]{6}$/, /^[0-9]{7}$/]
  },
  {
    name: 'Botswana',
    code: '+267',
    iso: 'BW',
    flag: '🇧🇼',
    mask: '00-000-000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Brazil',
    code: '+55',
    iso: 'BR',
    flag: '🇧🇷',
    mask: ['(00) 0000-0000', '(00) 00000-0000'],
    regex: [/^[0-9]{10}$/, /^[0-9]{11}$/]
  },
  {
    name: 'British Indian Ocean Territory',
    code: '+246',
    iso: 'IO',
    flag: '🇮🇴',
    mask: '000-0000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Brunei Darussalam',
    code: '+673',
    iso: 'BN',
    flag: '🇧🇳',
    mask: '000-0000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Bulgaria',
    code: '+359',
    iso: 'BG',
    flag: '🇧🇬',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Burkina Faso',
    code: '+226',
    iso: 'BF',
    flag: '🇧🇫',
    mask: '00-00-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Burundi',
    code: '+257',
    iso: 'BI',
    flag: '🇧🇮',
    mask: '00-00-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Cambodia',
    code: '+855',
    iso: 'KH',
    flag: '🇰🇭',
    mask: '00-000-000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Cameroon',
    code: '+237',
    iso: 'CM',
    flag: '🇨🇲',
    mask: '0000-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Canada',
    code: '+1',
    iso: 'CA',
    flag: '🇨🇦',
    mask: '(000) 000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Cape Verde',
    code: '+238',
    iso: 'CV',
    flag: '🇨🇻',
    mask: '(000) 00-00',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Cayman Islands',
    code: '+1',
    iso: 'KY',
    flag: '🇰🇾',
    mask: '(345) 000-0000',
    regex: /^345[0-9]{7}$/
  },
  {
    name: 'Central African Republic',
    code: '+236',
    iso: 'CF',
    flag: '🇨🇫',
    mask: '00-00-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Chad',
    code: '+235',
    iso: 'TD',
    flag: '🇹🇩',
    mask: '00-00-00-00',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Chile',
    code: '+56',
    iso: 'CL',
    flag: '🇨🇱',
    mask: '0-0000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'China',
    code: '+86',
    iso: 'CN',
    flag: '🇨🇳',
    mask: ['(000) 0000-000', '(000) 0000-0000', '00-00000-00000'],
    regex: [/^[0-9]{10}$/, /^[0-9]{11}$/, /^[0-9]{12}$/]
  },
  {
    name: 'Christmas Island',
    code: '+61',
    iso: 'CX',
    flag: '🇨🇽',
    mask: '0-0000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Cocos (Keeling) Islands',
    code: '+61',
    iso: 'CC',
    flag: '🇨🇨',
    mask: '0-0000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Colombia',
    code: '+57',
    iso: 'CO',
    flag: '🇨🇴',
    mask: '(000) 000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Comoros',
    code: '+269',
    iso: 'KM',
    flag: '🇰🇲',
    mask: '00-00000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Congo',
    code: '+242',
    iso: 'CG',
    flag: '🇨🇬',
    mask: '00-00000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Cook Islands',
    code: '+682',
    iso: 'CK',
    flag: '🇨🇰',
    mask: '00-000',
    regex: /^[0-9]{5}$/
  },
  {
    name: 'Costa Rica',
    code: '+506',
    iso: 'CR',
    flag: '🇨🇷',
    mask: '0000-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Croatia',
    code: '+385',
    iso: 'HR',
    flag: '🇭🇷',
    mask: '00-000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Cuba',
    code: '+53',
    iso: 'CU',
    flag: '🇨🇺',
    mask: '0-000-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Cyprus',
    code: '+357',
    iso: 'CY',
    flag: '🇨🇾',
    mask: '00-000-000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Czech Republic',
    code: '+420',
    iso: 'CZ',
    flag: '🇨🇿',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Democratic Republic of the Congo',
    code: '+243',
    iso: 'CD',
    flag: '🇨🇩',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Denmark',
    code: '+45',
    iso: 'DK',
    flag: '🇩🇰',
    mask: '00-00-00-00',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Djibouti',
    code: '+253',
    iso: 'DJ',
    flag: '🇩🇯',
    mask: '00-00-00-00',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Dominica',
    code: '+1',
    iso: 'DM',
    flag: '🇩🇲',
    mask: '(767) 000-0000',
    regex: /^767[0-9]{7}$/
  },
  {
    name: 'Dominican Republic',
    code: '+1',
    iso: 'DO',
    flag: '🇩🇴',
    mask: ['(809) 000-0000', '(829) 000-0000', '(849) 000-0000'],
    regex: [/^809[0-9]{7}$/, /^829[0-9]{7}$/, /^849[0-9]{7}$/]
  },
  {
    name: 'Ecuador',
    code: '+593',
    iso: 'EC',
    flag: '🇪🇨',
    mask: ['0-000-0000', '00-000-0000'],
    regex: [/^[0-9]{8}$/, /^[0-9]{9}$/]
  },
  {
    name: 'Egypt',
    code: '+20',
    iso: 'EG',
    flag: '🇪🇬',
    mask: '(000) 000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'El Salvador',
    code: '+503',
    iso: 'SV',
    flag: '🇸🇻',
    mask: '00-00-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Equatorial Guinea',
    code: '+240',
    iso: 'GQ',
    flag: '🇬🇶',
    mask: '00-000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Eritrea',
    code: '+291',
    iso: 'ER',
    flag: '🇪🇷',
    mask: '0-000-000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Estonia',
    code: '+372',
    iso: 'EE',
    flag: '🇪🇪',
    mask: ['000-0000', '0000-0000'],
    regex: [/^[0-9]{7}$/, /^[0-9]{8}$/]
  },
  {
    name: 'Eswatini',
    code: '+268',
    iso: 'SZ',
    flag: '🇸🇿',
    mask: '00-00-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Ethiopia',
    code: '+251',
    iso: 'ET',
    flag: '🇪🇹',
    mask: '00-000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Falkland Islands (Malvinas)',
    code: '+500',
    iso: 'FK',
    flag: '🇫🇰',
    mask: '00000',
    regex: /^[0-9]{5}$/
  },
  {
    name: 'Faroe Islands',
    code: '+298',
    iso: 'FO',
    flag: '🇫🇴',
    mask: '000-000',
    regex: /^[0-9]{6}$/
  },
  {
    name: 'Fiji',
    code: '+679',
    iso: 'FJ',
    flag: '🇫🇯',
    mask: '00-00000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Finland',
    code: '+358',
    iso: 'FI',
    flag: '🇫🇮',
    mask: '(000) 000-00-00',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'France',
    code: '+33',
    iso: 'FR',
    flag: '🇫🇷',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'French Guiana',
    code: '+594',
    iso: 'GF',
    flag: '🇬🇫',
    mask: '00000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'French Polynesia',
    code: '+689',
    iso: 'PF',
    flag: '🇵🇫',
    mask: '00-00-00',
    regex: /^[0-9]{6}$/
  },
  {
    name: 'Gabon',
    code: '+241',
    iso: 'GA',
    flag: '🇬🇦',
    mask: '0-00-00-00',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Gambia',
    code: '+220',
    iso: 'GM',
    flag: '🇬🇲',
    mask: '(000) 00-00',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Georgia',
    code: '+995',
    iso: 'GE',
    flag: '🇬🇪',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Germany',
    code: '+49',
    iso: 'DE',
    flag: '🇩🇪',
    mask: ['000-000', '(000) 00-00', '(000) 00-000', '(000) 00-0000', '(000) 000-0000', '(0000) 000-0000'],
    regex: [/^[0-9]{6}$/, /^[0-9]{8}$/, /^[0-9]{9}$/, /^[0-9]{10}$/, /^[0-9]{11}$/, /^[0-9]{12}$/]
  },
  {
    name: 'Ghana',
    code: '+233',
    iso: 'GH',
    flag: '🇬🇭',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Gibraltar',
    code: '+350',
    iso: 'GI',
    flag: '🇬🇮',
    mask: '000-00000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Greece',
    code: '+30',
    iso: 'GR',
    flag: '🇬🇷',
    mask: '(000) 000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Greenland',
    code: '+299',
    iso: 'GL',
    flag: '🇬🇱',
    mask: '00-00-00',
    regex: /^[0-9]{6}$/
  },
  {
    name: 'Grenada',
    code: '+1',
    iso: 'GD',
    flag: '🇬🇩',
    mask: '(473) 000-0000',
    regex: /^473[0-9]{7}$/
  },
  {
    name: 'Guadeloupe',
    code: '+590',
    iso: 'GP',
    flag: '🇬🇵',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Guam',
    code: '+1',
    iso: 'GU',
    flag: '🇬🇺',
    mask: '(671) 000-0000',
    regex: /^671[0-9]{7}$/
  },
  {
    name: 'Guatemala',
    code: '+502',
    iso: 'GT',
    flag: '🇬🇹',
    mask: '0-000-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Guernsey',
    code: '+44',
    iso: 'GG',
    flag: '🇬🇬',
    mask: '(0000) 000000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Guinea',
    code: '+224',
    iso: 'GN',
    flag: '🇬🇳',
    mask: '00-000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Guinea-Bissau',
    code: '+245',
    iso: 'GW',
    flag: '🇬🇼',
    mask: '0-000000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Guyana',
    code: '+592',
    iso: 'GY',
    flag: '🇬🇾',
    mask: '000-0000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Haiti',
    code: '+509',
    iso: 'HT',
    flag: '🇭🇹',
    mask: '00-00-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Holy See (Vatican City State)',
    code: '+379',
    iso: 'VA',
    flag: '🇻🇦',
    mask: '06 69800000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Honduras',
    code: '+504',
    iso: 'HN',
    flag: '🇭🇳',
    mask: '0000-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Hong Kong',
    code: '+852',
    iso: 'HK',
    flag: '🇭🇰',
    mask: '0000-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Hungary',
    code: '+36',
    iso: 'HU',
    flag: '🇭🇺',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Iceland',
    code: '+354',
    iso: 'IS',
    flag: '🇮🇸',
    mask: '000-0000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'India',
    code: '+91',
    iso: 'IN',
    flag: '🇮🇳',
    mask: '(0000) 000-000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Indonesia',
    code: '+62',
    iso: 'ID',
    flag: '🇮🇩',
    mask: ['00-000-00', '00-000-000', '00-000-0000', '(800) 000-000', '(800) 000-00-000'],
    regex: [/^[0-9]{7}$/, /^[0-9]{8}$/, /^[0-9]{9}$/, /^800[0-9]{6}$/, /^800[0-9]{9}$/]
  },
  {
    name: 'Iran',
    code: '+98',
    iso: 'IR',
    flag: '🇮🇷',
    mask: '(000) 000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Iraq',
    code: '+964',
    iso: 'IQ',
    flag: '🇮🇶',
    mask: '(000) 000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Ireland',
    code: '+353',
    iso: 'IE',
    flag: '🇮🇪',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Isle of Man',
    code: '+44',
    iso: 'IM',
    flag: '🇮🇲',
    mask: '(0000) 000000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Israel',
    code: '+972',
    iso: 'IL',
    flag: '🇮🇱',
    mask: ['0-000-0000', '50-000-0000'],
    regex: [/^[0-9]{8}$/, /^[0-9]{9}$/]
  },
  {
    name: 'Italy',
    code: '+39',
    iso: 'IT',
    flag: '🇮🇹',
    mask: '(000) 0000-000',
    regex: /^[0-9]{10}$/
  },
  {
    name: "Ivory Coast / Cote d'Ivoire",
    code: '+225',
    iso: 'CI',
    flag: '🇨🇮',
    mask: '00-000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Jamaica',
    code: '+1',
    iso: 'JM',
    flag: '🇯🇲',
    mask: '(876) 000-0000',
    regex: /^876[0-9]{7}$/
  },
  {
    name: 'Japan',
    code: '+81',
    iso: 'JP',
    flag: '🇯🇵',
    mask: ['(000) 000-000', '00-0000-0000'],
    regex: [/^[0-9]{9}$/, /^[0-9]{10}$/]
  },
  {
    name: 'Jersey',
    code: '+44',
    iso: 'JE',
    flag: '🇯🇪',
    mask: '(0000) 0000-000000',
    regex: /^[0-9]{14}$/
  },
  {
    name: 'Jordan',
    code: '+962',
    iso: 'JO',
    flag: '🇯🇴',
    mask: '0-0000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Kazakhstan',
    code: '+77',
    iso: 'KZ',
    flag: '🇰🇿',
    mask: ['(600) 000-00-00', '(700) 000-00-00'],
    regex: [/^600[0-9]{7}$/, /^700[0-9]{7}$/]
  },
  {
    name: 'Kenya',
    code: '+254',
    iso: 'KE',
    flag: '🇰🇪',
    mask: '000-000000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Kiribati',
    code: '+686',
    iso: 'KI',
    flag: '🇰🇮',
    mask: '00-000',
    regex: /^[0-9]{5}$/
  },
  {
    name: "Korea, Democratic People's Republic of Korea",
    code: '+850',
    iso: 'KP',
    flag: '🇰🇵',
    mask: ['000-000', '0000-0000', '00-000-000', '000-0000-000', '191-000-0000', '0000-0000000000000'],
    regex: [/^[0-9]{6}$/, /^[0-9]{8}$/, /^[0-9]{9}$/, /^[0-9]{10}$/, /^191[0-9]{7}$/, /^[0-9]{15}$/]
  },
  {
    name: 'Korea, Republic of South Korea',
    code: '+82',
    iso: 'KR',
    flag: '🇰🇷',
    mask: '00-000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Kosovo',
    code: '+383',
    iso: 'XK',
    flag: '🇽🇰',
    mask: ['00-000-000', '000-000-000'],
    regex: [/^[0-9]{9}$/, /^[0-9]{12}$/]
  },
  {
    name: 'Kuwait',
    code: '+965',
    iso: 'KW',
    flag: '🇰🇼',
    mask: '0000-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Kyrgyzstan',
    code: '+996',
    iso: 'KG',
    flag: '🇰🇬',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Laos',
    code: '+856',
    iso: 'LA',
    flag: '🇱🇦',
    mask: ['00-000-000', '(2000) 000-000'],
    regex: [/^[0-9]{8}$/, /^[0-9]{10}$/]
  },
  {
    name: 'Latvia',
    code: '+371',
    iso: 'LV',
    flag: '🇱🇻',
    mask: '00-000-000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Lebanon',
    code: '+961',
    iso: 'LB',
    flag: '🇱🇧',
    mask: ['0-000-000', '00-000-000'],
    regex: [/^[0-9]{7}$/, /^[0-9]{8}$/]
  },
  {
    name: 'Lesotho',
    code: '+266',
    iso: 'LS',
    flag: '🇱🇸',
    mask: '0-000-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Liberia',
    code: '+231',
    iso: 'LR',
    flag: '🇱🇷',
    mask: '00-000-000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Libya',
    code: '+218',
    iso: 'LY',
    flag: '🇱🇾',
    mask: ['00-000-000', '21-000-0000'],
    regex: [/^[0-9]{8}$/, /^21[0-9]{7}$/]
  },
  {
    name: 'Liechtenstein',
    code: '+423',
    iso: 'LI',
    flag: '🇱🇮',
    mask: '(000) 000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Lithuania',
    code: '+370',
    iso: 'LT',
    flag: '🇱🇹',
    mask: '(000) 00-000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Luxembourg',
    code: '+352',
    iso: 'LU',
    flag: '🇱🇺',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Macau',
    code: '+853',
    iso: 'MO',
    flag: '🇲🇴',
    mask: '0000-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Madagascar',
    code: '+261',
    iso: 'MG',
    flag: '🇲🇬',
    mask: '00-00-00000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Malawi',
    code: '+265',
    iso: 'MW',
    flag: '🇲🇼',
    mask: ['1-000-000', '0-0000-0000'],
    regex: [/^[0-9]{7}$/, /^[0-9]{9}$/]
  },
  {
    name: 'Malaysia',
    code: '+60',
    iso: 'MY',
    flag: '🇲🇾',
    mask: ['0-000-000', '00-000-000', '(000) 000-000', '00-000-0000'],
    regex: [/^[0-9]{7}$/, /^[0-9]{8}$/, /^[0-9]{9}$/, /^[0-9]{10}$/]
  },
  {
    name: 'Maldives',
    code: '+960',
    iso: 'MV',
    flag: '🇲🇻',
    mask: '000-0000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Mali',
    code: '+223',
    iso: 'ML',
    flag: '🇲🇱',
    mask: '00-00-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Malta',
    code: '+356',
    iso: 'MT',
    flag: '🇲🇹',
    mask: '0000-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Marshall Islands',
    code: '+692',
    iso: 'MH',
    flag: '🇲🇭',
    mask: '000-0000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Martinique',
    code: '+596',
    iso: 'MQ',
    flag: '🇲🇶',
    mask: '(000) 00-00-00',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Mauritania',
    code: '+222',
    iso: 'MR',
    flag: '🇲🇷',
    mask: '00-00-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Mauritius',
    code: '+230',
    iso: 'MU',
    flag: '🇲🇺',
    mask: '000-0000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Mayotte',
    code: '+262',
    iso: 'YT',
    flag: '🇾🇹',
    mask: '00000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Mexico',
    code: '+52',
    iso: 'MX',
    flag: '🇲🇽',
    mask: ['00-00-0000', '(000) 000-0000'],
    regex: [/^[0-9]{8}$/, /^[0-9]{10}$/]
  },
  {
    name: 'Micronesia, Federated States of Micronesia',
    code: '+691',
    iso: 'FM',
    flag: '🇫🇲',
    mask: '000-0000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Moldova',
    code: '+373',
    iso: 'MD',
    flag: '🇲🇩',
    mask: '0000-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Monaco',
    code: '+377',
    iso: 'MC',
    flag: '🇲🇨',
    mask: ['00-000-000', '(000) 000-000'],
    regex: [/^[0-9]{8}$/, /^[0-9]{9}$/]
  },
  {
    name: 'Mongolia',
    code: '+976',
    iso: 'MN',
    flag: '🇲🇳',
    mask: '00-00-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Montenegro',
    code: '+382',
    iso: 'ME',
    flag: '🇲🇪',
    mask: '00-000-000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Montserrat',
    code: '+1',
    iso: 'MS',
    flag: '🇲🇸',
    mask: '(664) 000-0000',
    regex: /^664[0-9]{7}$/
  },
  {
    name: 'Morocco',
    code: '+212',
    iso: 'MA',
    flag: '🇲🇦',
    mask: '00-0000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Mozambique',
    code: '+258',
    iso: 'MZ',
    flag: '🇲🇿',
    mask: '00-000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Myanmar',
    code: '+95',
    iso: 'MM',
    flag: '🇲🇲',
    mask: ['000-000', '0-000-000', '00-000-000'],
    regex: [/^[0-9]{6}$/, /^[0-9]{7}$/, /^[0-9]{8}$/]
  },
  {
    name: 'Namibia',
    code: '+264',
    iso: 'NA',
    flag: '🇳🇦',
    mask: '00-000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Nauru',
    code: '+674',
    iso: 'NR',
    flag: '🇳🇷',
    mask: '000-0000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Nepal',
    code: '+977',
    iso: 'NP',
    flag: '🇳🇵',
    mask: '00-000-000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Netherlands',
    code: '+31',
    iso: 'NL',
    flag: '🇳🇱',
    mask: '00-000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'New Caledonia',
    code: '+687',
    iso: 'NC',
    flag: '🇳🇨',
    mask: '00-0000',
    regex: /^[0-9]{6}$/
  },
  {
    name: 'New Zealand',
    code: '+64',
    iso: 'NZ',
    flag: '🇳🇿',
    mask: ['0-000-000', '(000) 000-000', '(000) 000-0000'],
    regex: [/^[0-9]{7}$/, /^[0-9]{9}$/, /^[0-9]{10}$/]
  },
  {
    name: 'Nicaragua',
    code: '+505',
    iso: 'NI',
    flag: '🇳🇮',
    mask: '0000-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Niger',
    code: '+227',
    iso: 'NE',
    flag: '🇳🇪',
    mask: '00-00-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Nigeria',
    code: '+234',
    iso: 'NG',
    flag: '🇳🇬',
    mask: ['00-000-00', '00-000-000', '(000) 000-0000'],
    regex: [/^[0-9]{8}$/, /^[0-9]{9}$/, /^[0-9]{10}$/]
  },
  {
    name: 'Niue',
    code: '+683',
    iso: 'NU',
    flag: '🇳🇺',
    mask: '0000',
    regex: /^[0-9]{4}$/
  },
  {
    name: 'Norfolk Island',
    code: '+672',
    iso: 'NF',
    flag: '🇳🇫',
    mask: '300-000',
    regex: /^[0-9]{6}$/
  },
  {
    name: 'North Macedonia',
    code: '+389',
    iso: 'MK',
    flag: '🇲🇰',
    mask: '00-000-000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Northern Mariana Islands',
    code: '+1',
    iso: 'MP',
    flag: '🇲🇵',
    mask: '(670) 000-0000',
    regex: /^670[0-9]{7}$/
  },
  {
    name: 'Norway',
    code: '+47',
    iso: 'NO',
    flag: '🇳🇴',
    mask: '(000) 00-000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Oman',
    code: '+968',
    iso: 'OM',
    flag: '🇴🇲',
    mask: '00-000-000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Pakistan',
    code: '+92',
    iso: 'PK',
    flag: '🇵🇰',
    mask: '(000) 000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Palau',
    code: '+680',
    iso: 'PW',
    flag: '🇵🇼',
    mask: '000-0000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Palestine',
    code: '+970',
    iso: 'PS',
    flag: '🇵🇸',
    mask: '00-000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Panama',
    code: '+507',
    iso: 'PA',
    flag: '🇵🇦',
    mask: '000-0000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Papua New Guinea',
    code: '+675',
    iso: 'PG',
    flag: '🇵🇬',
    mask: '(000) 00-000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Paraguay',
    code: '+595',
    iso: 'PY',
    flag: '🇵🇾',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Peru',
    code: '+51',
    iso: 'PE',
    flag: '🇵🇪',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Philippines',
    code: '+63',
    iso: 'PH',
    flag: '🇵🇭',
    mask: '(000) 000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Pitcairn',
    code: '+870',
    iso: 'PN',
    flag: '🇵🇳',
    mask: '000-000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Poland',
    code: '+48',
    iso: 'PL',
    flag: '🇵🇱',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Portugal',
    code: '+351',
    iso: 'PT',
    flag: '🇵🇹',
    mask: '00-000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Puerto Rico',
    code: '+1',
    iso: 'PR',
    flag: '🇵🇷',
    mask: ['(787) 000-0000', '(939) 000-0000'],
    regex: [/^787[0-9]{7}$/, /^939[0-9]{7}$/]
  },
  {
    name: 'Qatar',
    code: '+974',
    iso: 'QA',
    flag: '🇶🇦',
    mask: '0000-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Reunion',
    code: '+262',
    iso: 'RE',
    flag: '🇷🇪',
    mask: '00000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Romania',
    code: '+40',
    iso: 'RO',
    flag: '🇷🇴',
    mask: '00-000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Russia',
    code: '+7',
    iso: 'RU',
    flag: '🇷🇺',
    mask: '(000) 000-00-00',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Rwanda',
    code: '+250',
    iso: 'RW',
    flag: '🇷🇼',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Saint Barthelemy',
    code: '+590',
    iso: 'BL',
    flag: '🇧🇱',
    mask: '000-00-00-00',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Saint Helena, Ascension and Tristan Da Cunha',
    code: '+290',
    iso: 'SH',
    flag: '🇸🇭',
    mask: '0000',
    regex: /^[0-9]{4}$/
  },
  {
    name: 'Saint Kitts and Nevis',
    code: '+1',
    iso: 'KN',
    flag: '🇰🇳',
    mask: '(869) 000-0000',
    regex: /^869[0-9]{7}$/
  },
  {
    name: 'Saint Lucia',
    code: '+1',
    iso: 'LC',
    flag: '🇱🇨',
    mask: '(758) 000-0000',
    regex: /^758[0-9]{7}$/
  },
  {
    name: 'Saint Martin',
    code: '+590',
    iso: 'MF',
    flag: '🇲🇫',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Saint Pierre and Miquelon',
    code: '+508',
    iso: 'PM',
    flag: '🇵🇲',
    mask: '00-0000',
    regex: /^[0-9]{6}$/
  },
  {
    name: 'Saint Vincent and the Grenadines',
    code: '+1',
    iso: 'VC',
    flag: '🇻🇨',
    mask: '(784) 000-0000',
    regex: /^784[0-9]{7}$/
  },
  {
    name: 'Samoa',
    code: '+685',
    iso: 'WS',
    flag: '🇼🇸',
    mask: '00-0000',
    regex: /^[0-9]{6}$/
  },
  {
    name: 'San Marino',
    code: '+378',
    iso: 'SM',
    flag: '🇸🇲',
    mask: '0000-000000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Sao Tome and Principe',
    code: '+239',
    iso: 'ST',
    flag: '🇸🇹',
    mask: '00-00000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Saudi Arabia',
    code: '+966',
    iso: 'SA',
    flag: '🇸🇦',
    mask: ['0-000-0000', '50-0000-0000'],
    regex: [/^[0-9]{8}$/, /^[0-9]{10}$/]
  },
  {
    name: 'Senegal',
    code: '+221',
    iso: 'SN',
    flag: '🇸🇳',
    mask: '00-000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Serbia',
    code: '+381',
    iso: 'RS',
    flag: '🇷🇸',
    mask: '00-000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Seychelles',
    code: '+248',
    iso: 'SC',
    flag: '🇸🇨',
    mask: '0-000-000',
    regex: /^[0-9]{7}$/
  },
  {
    name: 'Sierra Leone',
    code: '+232',
    iso: 'SL',
    flag: '🇸🇱',
    mask: '00-000000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Singapore',
    code: '+65',
    iso: 'SG',
    flag: '🇸🇬',
    mask: '0000-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Slovakia',
    code: '+421',
    iso: 'SK',
    flag: '🇸🇰',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Slovenia',
    code: '+386',
    iso: 'SI',
    flag: '🇸🇮',
    mask: '00-000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Solomon Islands',
    code: '+677',
    iso: 'SB',
    flag: '🇸🇧',
    mask: ['00000', '000-0000'],
    regex: [/^[0-9]{5}$/, /^[0-9]{7}$/]
  },
  {
    name: 'Somalia',
    code: '+252',
    iso: 'SO',
    flag: '🇸🇴',
    mask: ['0-000-000', '00-000-000'],
    regex: [/^[0-9]{7}$/, /^[0-9]{8}$/]
  },
  {
    name: 'South Africa',
    code: '+27',
    iso: 'ZA',
    flag: '🇿🇦',
    mask: '00-000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'South Georgia and the South Sandwich Islands',
    code: '+500',
    iso: 'GS',
    flag: '🇬🇸',
    mask: '00000',
    regex: /^[0-9]{5}$/
  },
  {
    name: 'Spain',
    code: '+34',
    iso: 'ES',
    flag: '🇪🇸',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Sri Lanka',
    code: '+94',
    iso: 'LK',
    flag: '🇱🇰',
    mask: '00-000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Sudan',
    code: '+249',
    iso: 'SD',
    flag: '🇸🇩',
    mask: '00-000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Suriname',
    code: '+597',
    iso: 'SR',
    flag: '🇸🇷',
    mask: ['000-000', '000-0000'],
    regex: [/^[0-9]{6}$/, /^[0-9]{7}$/]
  },
  {
    name: 'Svalbard and Jan Mayen',
    code: '+47',
    iso: 'SJ',
    flag: '🇸🇯',
    mask: '(000) 00-000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Sweden',
    code: '+46',
    iso: 'SE',
    flag: '🇸🇪',
    mask: '00-000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Switzerland',
    code: '+41',
    iso: 'CH',
    flag: '🇨🇭',
    mask: '00-000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Syrian Arab Republic',
    code: '+963',
    iso: 'SY',
    flag: '🇸🇾',
    mask: '00-0000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Taiwan',
    code: '+886',
    iso: 'TW',
    flag: '🇹🇼',
    mask: ['0000-0000', '0-0000-0000'],
    regex: [/^[0-9]{8}$/, /^[0-9]{9}$/]
  },
  {
    name: 'Tajikistan',
    code: '+992',
    iso: 'TJ',
    flag: '🇹🇯',
    mask: '00-000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Tanzania, United Republic of Tanzania',
    code: '+255',
    iso: 'TZ',
    flag: '🇹🇿',
    mask: '00-000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Thailand',
    code: '+66',
    iso: 'TH',
    flag: '🇹🇭',
    mask: ['00-000-000', '00-000-0000'],
    regex: [/^[0-9]{9}$/, /^[0-9]{10}$/]
  },
  {
    name: 'Timor-Leste',
    code: '+670',
    iso: 'TL',
    flag: '🇹🇱',
    mask: ['000-0000', '770-00000', '780-00000'],
    regex: [/^[0-9]{7}$/, /^770[0-9]{5}$/, /^780[0-9]{5}$/]
  },
  {
    name: 'Togo',
    code: '+228',
    iso: 'TG',
    flag: '🇹🇬',
    mask: '00-000-000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Tokelau',
    code: '+690',
    iso: 'TK',
    flag: '🇹🇰',
    mask: '0000',
    regex: /^[0-9]{4}$/
  },
  {
    name: 'Tonga',
    code: '+676',
    iso: 'TO',
    flag: '🇹🇴',
    mask: '00000',
    regex: /^[0-9]{5}$/
  },
  {
    name: 'Trinidad and Tobago',
    code: '+1',
    iso: 'TT',
    flag: '🇹🇹',
    mask: '(868) 000-0000',
    regex: /^868[0-9]{7}$/
  },
  {
    name: 'Tunisia',
    code: '+216',
    iso: 'TN',
    flag: '🇹🇳',
    mask: '00-000-000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Turkey',
    code: '+90',
    iso: 'TR',
    flag: '🇹🇷',
    mask: '(000) 000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Turkmenistan',
    code: '+993',
    iso: 'TM',
    flag: '🇹🇲',
    mask: '0-000-0000',
    regex: /^[0-9]{8}$/
  },
  {
    name: 'Turks and Caicos Islands',
    code: '+1',
    iso: 'TC',
    flag: '🇹🇨',
    mask: '(649) 000-0000',
    regex: /^649[0-9]{7}$/
  },
  {
    name: 'Tuvalu',
    code: '+688',
    iso: 'TV',
    flag: '🇹🇻',
    mask: ['20000', '900000'],
    regex: [/^20000$/, /^900000$/]
  },
  {
    name: 'Uganda',
    code: '+256',
    iso: 'UG',
    flag: '🇺🇬',
    mask: '(000) 000-000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Ukraine',
    code: '+380',
    iso: 'UA',
    flag: '🇺🇦',
    mask: '(00) 000-00-00',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'United Arab Emirates',
    code: '+971',
    iso: 'AE',
    flag: '🇦🇪',
    mask: ['0-000-0000', '50-000-0000'],
    regex: [/^[0-9]{8}$/, /^50[0-9]{7}$/]
  },
  {
    name: 'United Kingdom',
    code: '+44',
    iso: 'GB',
    flag: '🇬🇧',
    mask: '00-0000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'United States',
    code: '+1',
    iso: 'US',
    flag: '🇺🇸',
    mask: '(000) 000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Uruguay',
    code: '+598',
    iso: 'UY',
    flag: '🇺🇾',
    mask: '0-000-00-00',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Uzbekistan',
    code: '+998',
    iso: 'UZ',
    flag: '🇺🇿',
    mask: '00-000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Vanuatu',
    code: '+678',
    iso: 'VU',
    flag: '🇻🇺',
    mask: ['00000', '00-00000'],
    regex: [/^[0-9]{5}$/, /^[0-9]{7}$/]
  },
  {
    name: 'Venezuela, Bolivarian Republic of Venezuela',
    code: '+58',
    iso: 'VE',
    flag: '🇻🇪',
    mask: '(000) 000-0000',
    regex: /^[0-9]{10}$/
  },
  {
    name: 'Vietnam',
    code: '+84',
    iso: 'VN',
    flag: '🇻🇳',
    mask: ['00-0000-000', '(000) 0000-000'],
    regex: [/^[0-9]{9}$/, /^[0-9]{10}$/]
  },
  {
    name: 'Virgin Islands, British',
    code: '+1',
    iso: 'VG',
    flag: '🇻🇬',
    mask: '(284) 000-0000',
    regex: /^284[0-9]{7}$/
  },
  {
    name: 'Virgin Islands, U.S.',
    code: '+1',
    iso: 'VI',
    flag: '🇻🇮',
    mask: '(340) 000-0000',
    regex: /^340[0-9]{7}$/
  },
  {
    name: 'Wallis and Futuna',
    code: '+681',
    iso: 'WF',
    flag: '🇼🇫',
    mask: '00-0000',
    regex: /^[0-9]{6}$/
  },
  {
    name: 'Yemen',
    code: '+967',
    iso: 'YE',
    flag: '🇾🇪',
    mask: ['0-000-000', '00-000-000', '000-000-000'],
    regex: [/^[0-9]{7}$/, /^[0-9]{8}$/, /^[0-9]{9}$/]
  },
  {
    name: 'Zambia',
    code: '+260',
    iso: 'ZM',
    flag: '🇿🇲',
    mask: '00-000-0000',
    regex: /^[0-9]{9}$/
  },
  {
    name: 'Zimbabwe',
    code: '+263',
    iso: 'ZW',
    flag: '🇿🇼',
    mask: '0-000000',
    regex: /^[0-9]{7}$/
  }
]

export const isPhone = ({ iso, ddi, number }: IsPhoneOptions) => {
  const item = countriesPhone.find((item) => item.iso === iso && item.code === ddi)

  if (!item) {
    return false
  }

  const rgx = Array.isArray(item.regex) ? item.regex : [item.regex]

  const value = clearSpecialChars(number).replace(/ /g, '')

  return rgx.some((rgx) => rgx.test(value))
}
