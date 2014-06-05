#include "block.h"

std::string resourceDir = "../ressources/";
std::map<std::string, Block*> Block::TYPES;
std::vector<std::string> uniqueBlocks;

Block::Block(std::string name, std::string imageFile)
{
	this->m_name = name;
	QString imagePath = QString::fromStdString(resourceDir);
	imagePath.append(QString::fromStdString(imageFile));
	this->m_sprite = new QIcon(imagePath);
}

Block::~Block()
{
}

std::string Block::getName()
{
	return this->m_name;
}

QIcon *Block::getSprite()
{
	return this->m_sprite;
}

void Block::setIdentifier(std::string id)
{
	this->m_identifier = id;
}

void Block::setArguments(std::string arg)
{
	this->m_arguments = arg;
}

std::string Block::getIdentifier()
{
	return this->m_identifier;
}

std::string Block::getArguments()
{
	return this->m_arguments;
}

void Block::initBlockTypes()
{
	QSettings settings("editor.ini", QSettings::IniFormat);
	settings.beginGroup("Config");
	resourceDir = settings.value("resourceDir").toString().toStdString();
	settings.endGroup();

	// Create the blocks
	settings.beginGroup("Sprites");
	QStringList childKeys = settings.childKeys();
	foreach(const QString &childKey, childKeys)
	{
		std::string name = childKey.toStdString();
		std::string imageFile = settings.value(childKey).toString().toStdString();

		Block *b = new Block(name,imageFile);
		TYPES.insert(std::pair<std::string,Block*>(name,b));
	}
	settings.endGroup();

	// Set the identifiers
	settings.beginGroup("Identifiers");
	childKeys = settings.childKeys();
	foreach(const QString &childKey, childKeys)
	{
		std::string name = childKey.toStdString();
		TYPES[name]->setIdentifier(settings.value(childKey).toString().toStdString());
	}
	settings.endGroup();

	// Set the arguments
	settings.beginGroup("Arguments");
	childKeys = settings.childKeys();
	foreach(const QString &childKey, childKeys)
	{
		std::string name = childKey.toStdString();
		TYPES[name]->setArguments(settings.value(childKey).toString().toStdString());
	}
	settings.endGroup();

	uniqueBlocks.push_back("Begin");
	uniqueBlocks.push_back("End");
}
