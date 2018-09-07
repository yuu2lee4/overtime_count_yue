import * as Excel from 'excel-class';

export function read(filepath, { sheet, peopleList, name, workSart, workEnd, date, department, subsidies }) {
    const excel = new Excel(filepath);

    const data = excel.readSheet(sheet);
    const result = [];

    for (const [i, item] of data.entries()) {
        const _name = item[name];

        if (peopleList.includes(_name)) {
            const nextDay_startHour = data[i + 1][workSart] ? data[i + 1][workSart].split(':')[0] : 24;
            const endHour = item[workEnd] ? item[workEnd].split(':')[0] : '';

            if (endHour >= 21 || (endHour === '' && nextDay_startHour < 6)) {
                const _date = new Date(item[date]).toLocaleString().split(' ')[0];
                result.push({
                    姓名: _name,
                    平台: item[department],
                    加班日期: _date,
                    餐费: subsidies,
                    打车费: (endHour >= 22 || (endHour === '' && nextDay_startHour < 6)) ? '有' : '',
                });
            }
        }
    }
    return result;
}
export function write(data = [], { filename, subsidies }) {
    const totalByPerson = {};
    let total = 0;
    for (const item of data) {
        if (!totalByPerson[item['姓名']]) totalByPerson[item['姓名']] = 0;
        totalByPerson[item['姓名']] += subsidies * 1;
        total += subsidies * 1;
    }

    if (data.length) {
        data.sort((prev, next) => {
            if (prev['姓名'] === next['姓名']) {
                return new Date(prev['加班日期']) - new Date(next['加班日期']);
            }
            return prev['姓名'] > next['姓名'] ? -1 : 1;
        });
        data = data.map((item, i) => {
            item['序号'] = i + 1;
            return item;
        });
        for (const name in totalByPerson) {
            data.push({
                姓名: name,
                餐费: totalByPerson[name],
            });
        }
        data.push({
            姓名: '总计',
            餐费: total,
        });
        const exportExcel = new Excel(filename);
        return exportExcel.writeSheet('汇总', ['序号', '姓名', '平台', '二级部门', '三级部门', '加班日期', '餐费', '打车费', '备注'], data);
    }
}
