import Employee from "../models/Employee";
import { pagination } from "../libs/pagination";

export const findEmployees = async (req, res) => {
  try {
    const { size, page, name } = req.query;
    const condition = name
      ? { name: { $regex: new RegExp(name), $options: "i" } }
      : {};
    const { limit, offset } = pagination(size, page);
    const employees = await Employee.paginate(condition, { limit, offset });

    res.json({
      totalItems: employees.totalDocs,
      employees: employees.docs,
      totalPages: employees.totalPages,
      currentPage: employees.page,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving employee",
    });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const employeeSave = await employee.save();
    res.json({ message: "Employee created", employee: employeeSave });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving employee",
    });
  }
};

export const findEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        message: `Employee with id ${id} does not exists`,
      });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving employee",
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Employee Updated", employee });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving employee",
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving employee",
    });
  }
};
