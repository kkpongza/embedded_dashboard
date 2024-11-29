import dayjs, { PluginFunc } from "dayjs";

const buddhistEra: PluginFunc = (option, dayjsClass) => {
    const oldFormat = dayjsClass.prototype.format;

    dayjsClass.prototype.format = function (formatStr: string): string {
        const yearInBE = this.year() + 543; // Convert year to Buddhist Era
        return oldFormat.call(
            this,
            formatStr.replace(/BBBB/g, yearInBE.toString())
        ); // Replace BBBB with Buddhist Year
    };
};

export default buddhistEra;
