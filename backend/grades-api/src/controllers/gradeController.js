import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
const { Grades } = db
const create = async (req, res) => {
  try {
    const { name, subject, type, value } = req.body
    const newGrade = await new Grades({ name, subject, type, value }).save()

    if (!newGrade) return res.status(404).json({ status: 404, message: 'It was not possible to create the new grade please checkout the parameters' })
    logger.info(`POST /grade - ${JSON.stringify()}`);

    return res.json({ message: 'Grade created sucessfully', data: newGrade })
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;
  //condicao para o filtro no findAll
  let condition = name
    ? { name: { regex: new RegExp(name), options: 'i' } }
    : null;

  try {
    let grades = null
    if (!condition) {
      grades = await Grades.find({}, { _id: 0, __v: 0 })
      return res.json({ message: "grades found sucessfully ", data: grades })
    }
    const { regex, options } = condition.name
    grades = await Grades.find({ name: { $regex: regex, $options: options } })

    logger.info(`GET /grade`);
    return res.json({ message: `those are the grades found with the name ${name}`, grades })
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const grade = await Grades.findOne({ _id: id }, { _id: 0, __v: 0 })
    if (!grade) return res.status(404).json({ status: 404, message: `id ${id} not found` })
    return res.json({ message: 'Grade find sucessfully', data: grade })
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;


  try {
    const { name, subject, type, value } = req.body
    if (!name || !subject || !type || !value) return res.status(401).json({ error: "bad request", message: "Please check your parameters" })
    const updatedGrade = await Grades.findOneAndUpdate({ _id: id }, { name, subject, type, value }, { new: true, projection: { _id: 0, __v: 0 } })

    if (!updatedGrade) return res.status(404).json({ message: `id ${id} not found` })

    res.json({ message: `Grade with id ${id} has been updated sucessfully`, data: updatedGrade })

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id, error: error.message });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedGrade = await Grades.remove({ _id: id })

    if (!deletedGrade) return res.status(404).json({ message: `id ${id} not found`, error: 'Not Found' })

    res.json({ message: 'Grade removed sucessfully' });
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  const id = req.params.id;

  try {
    await Grades.deleteMany({})
    res.json({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
